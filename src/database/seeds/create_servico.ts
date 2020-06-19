import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("servicos").insert([
    {
      name: "Serviços de Limpeza em Geral",
      info: "Profissionais para seu serviço de limpeza e arrumação.",
      img: "broom.svg",
    },
    {
      name: "Jardinagem",
      info: "Profissionais em jardinagem ideais para seu serviço.",
      img: "garden.svg",
    },
    {
      name: "Serviços Domésticos Técnicos",
      info:
        "Reforma? Encanamento? Ou até mesmo informática? Aqui você encontra os melhores profissionais da região!",
      img: "home.svg",
    },
    {
      name: "Cuidadores e Babás",
      info:
        "Pessoas certas para manter os cuidados do seu crianças, pets ou pessoas idosas.",
      img: "healthy.svg",
    },
  ]);
}
