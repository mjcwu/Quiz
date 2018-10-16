
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cluckr", table =>{
    table.increments("id"); 
    table.string("username"); 
    table.text("content"); 
    table.string("imageUrl"); 
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cluckr");
};
