import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("contratos", (table) => {
    table.increments("id").primary();
    table.date("data").notNullable();
    table.string("email").notNullable();
    table.string("status").notNullable();
    table.integer("avaliacao").notNullable();
    table
      .integer("contratante_id")
      .notNullable()
      .references("id")
      .inTable("contratantes");
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
    table.string("rua").notNullable();
    table.string("numero").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("contratos");
}
