import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("serv_prestado", (table) => {
    table.increments("id").primary();
    table.string("img_url").notNullable();
    table.string("descricao").notNullable();
    table
      .integer("servico_id")
      .notNullable()
      .references("id")
      .inTable("servicos");
    table
      .integer("prestador_id")
      .notNullable()
      .references("id")
      .inTable("prestadores");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("serv_prestado");
}
