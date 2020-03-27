const connection = require('../database/connection');

module.exports = {
  /** * LISTAR TODOS OS CASOS ** */
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count(); // contagem do total de casos

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']); // enviando o total pelo cabeçalho de resposta

    return res.json(incidents);
  },

  /** * CADASTRAR NOVO CASO ** */
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },

  /** * DELETAR CASO ** */
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    // Verificar se o id do caso é igual ao id da ONG
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    // Deletar o caso
    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  },
};
