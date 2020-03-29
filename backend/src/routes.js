const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Login
routes.post('/sessions', SessionController.create);

// Listar todas as ongs
routes.get('/ongs', OngController.index);
// Criar ong
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  OngController.create
);

// Listar todos os casos
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index
);
// Criar novo caso
routes.post('/incidents', IncidentController.create);
// Deletar um caso
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete
);

// Listar casos de uma ONG
routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

module.exports = routes;
