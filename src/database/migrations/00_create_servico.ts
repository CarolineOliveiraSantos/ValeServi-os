import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("servicos", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("info").notNullable();
    table.string("img").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("servicos");
}
