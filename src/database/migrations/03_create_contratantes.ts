import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("contratantes", (table) => {
    table.increments("id").primary();
    table.string("cpf").notNullable();
    table.string("nome").notNullable();
    table.string("email").notNullable();
    table.string("senha").notNullable();
    table.string("telefone").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("contratantes");
}
