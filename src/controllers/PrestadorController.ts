import knex from "../database/connection";
import { Request, Response } from "express";

class PrestadorController {
  //listar um prestador especifico por id
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const prestador = await knex("prestadores").where("id", id).first();

    if (!prestador) {
      return res.status(400).json({ message: "Prestador not found..." });
    }
    const serializedPrestador = {
      ...prestador,
    };

    const servicosP = await knex("servicos")
      .join("serv_prestado", "servicos.id", "=", "serv_prestado.servico_id")
      .where("serv_prestado.prestador_id", id)
      .select(
        "serv_prestado.id",
        "servicos.name",
        "serv_prestado.img_url",
        "serv_prestado.descricao"
      );

    return res.json({ prestador: serializedPrestador, servicosP });
  }

  //apagar prestador
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const prestador = await knex("prestadores").where("id", id).first();

    if (!prestador) {
      return res.status(400).json({ message: "Prestador not found..." });
    }

    await knex("prestadores").delete("*").where("prestadores.id", id);

    return res.json("Conta removida!");
  }

  //listar um prestador especifico por detalhe
  async detalhe(req: Request, res: Response) {
    const { id } = req.params;

    const prestador = await knex("prestadores").where("id", id).first();

    if (!prestador) {
      return res.status(400).json({ message: "Prestador not found..." });
    }

    const serializedPrestador = {
      // img_url: `http://192.168.42.3:3333/uploads/home.svg`,
      img: prestador.img,
      nome: prestador.nome,
      email: prestador.email,
      sobre: prestador.sobre,
      telefone: prestador.telefone,
      referencia: prestador.referencia,
    };

    const servicosP = await knex("servicos")
      .join("serv_prestado", "servicos.id", "=", "serv_prestado.servico_id")
      .where("serv_prestado.prestador_id", id);

    return res.json({ serializedPrestador, servicosP });
  }

  //listar prestadores por filtro: cidade
  async index(req: Request, res: Response) {
    const { city } = req.query;

    const prestadorCidade = await knex("prestadores")
      .join(
        "serv_prestado",
        "prestadores.id",
        "=",
        "serv_prestado.prestador_id"
      )
      .where("city", String(city))
      .distinct()
      .select("prestadores.*");

    const serializedPrestador = prestadorCidade.map((prestador) => {
      return {
        nome: prestador.nome,
        telefone: prestador.telefone,
        sobre: prestador.sobre,
      };
    });
    return res.json(serializedPrestador);
  }

  // listar todos os prestadores
  async indexx(req: Request, res: Response) {
    const todososPrestadores = await knex("prestadores").select("*");
    return res.json(todososPrestadores);
  }

  //criar prestador de serviço
  async create(req: Request, res: Response) {
    const {
      cpf,
      // img,
      nome,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      servicos,
      descricao,
      img_url,
      city,
      uf,
    } = req.body;

    const trx = await knex.transaction();
    const prestadores = {
      // img: req.file.filename,
      img: "image-fake",
      cpf,
      nome,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      city,
      uf,
    };
    const insertedIds = await trx("prestadores").insert(prestadores);

    // inserir chave estrnahgeria
    const prestador_id = insertedIds[0];

    const prestadorServicos = servicos
      .split(",")
      .map((servico: string) => Number(servico.trim()))
      .map((servico_id: number) => {
        return {
          descricao,
          img_url,
          servico_id,
          prestador_id,
        };
      });
    await trx("serv_prestado").insert(prestadorServicos);
    await trx.commit();

    return res.json({ id: prestador_id, ...prestadores, prestadorServicos });
  }

  // ediar dadfso do prestador
  async update(req: Request, res: Response) {
    const { id } = req.params;

    const prestadorId = await knex("prestadores")
      // .select("*")
      .where("id", id)
      .first();
    const prestadorDados = await knex("prestadores")
      .select("*")
      .where("id", id)
      .first();

    if (!prestadorId) {
      return res.status(400).json({ message: "Prestador not found..." });
    }

    const {
      // cpf,
      // img,
      nome,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      city,
      uf,
    } = req.body;

    const prestadores = {
      // img: req.file.filename,
      img: "image-fake",
      // cpf,
      nome,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      city,
      uf,
    };
    const trx = await knex.transaction();

    const atualizarDados = await trx("prestadores")
      .update(prestadores)
      .where("prestadores.id", "=", prestadorDados.id);
    await trx.commit();

    return res.json(atualizarDados);
  }
}

export default PrestadorController;
