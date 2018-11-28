
exports.up = function(knex, Promise) {
  return knex.schema.table("cluckr", table => {
    
    table.string("timeAgo"); 
    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("cluckr", table =>{
    table.dropColumn("timeAgo");
  })
};

