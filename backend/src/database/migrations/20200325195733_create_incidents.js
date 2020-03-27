
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();

        // Relacionamento com o banco de dados
        table.string('ong_id').notNullable()
        // Chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
