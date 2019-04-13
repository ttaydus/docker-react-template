exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('username');
  })
    .createTable("cards", function(table){
      table.increments('id');
      table.string('title');
      table.string('priority');
      table.string('status');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
