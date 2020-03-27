const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  /** * LISTAR TODAS AS ONGS ** */
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  /** * CADASTRAR NOVA ONG ** */
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    // Gerar o id
    const id = crypto.randomBytes(4).toString('HEX');

    // Inserir os dados no banco de dados
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  },
};
