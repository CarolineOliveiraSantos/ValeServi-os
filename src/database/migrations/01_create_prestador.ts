import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("prestadores", (table) => {
    table.increments("id").primary();
    table.string("cpf", 11).notNullable();
    table.string("nome").notNullable();
    table.string("img").notNullable();
    table.string("email").notNullable();
    table.string("senha").notNullable();
    table.string("telefone").notNullable();
    table.string("sobre").notNullable();
    table.string("referencia").notNullable();

    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("prestadores");
}
