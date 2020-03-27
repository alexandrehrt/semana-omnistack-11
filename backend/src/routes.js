const express = require('express');

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
routes.post('/ongs', OngController.create);

// Listar todos os casos
routes.get('/incidents', IncidentController.index);
// Criar novo caso
routes.post('/incidents', IncidentController.create);
// Deletar um caso
routes.delete('/incidents/:id', IncidentController.delete);

// Listar casos de uma ONG
routes.get('/profile', ProfileController.index);

module.exports = routes;
