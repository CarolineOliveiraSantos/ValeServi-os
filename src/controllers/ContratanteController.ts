import knex from "../database/connection";
import { Request, Response } from "express";

class ContratanteController {
  //criar contratantes de serviço
  async create(req: Request, res: Response) {
    const { cpf, nome, email, senha, telefone, city, uf } = req.body;

    const trx = await knex.transaction();
    const contratantes = {
      cpf,
      nome,
      email,
      senha,
      telefone,
      city,
      uf,
    };
    const contratanteCriar = await trx("contratantes").insert(contratantes);

    await trx.commit();

    return res.json({ contratanteCriar, ...contratantes });
  }

  //listar dado do contrantes
  async detalhe(req: Request, res: Response) {
    const { id } = req.params;

    const contrante = await knex("contratantes").where("id", id).first();

    if (!contrante) {
      return res.status(400).json({ message: "Contrante not found..." });
    }

    const serializedContrante = {
      // img_url: `http://192.168.42.3:3333/uploads/home.svg`,
      nome: contrante.nome,
      email: contrante.email,
      telefone: contrante.telefone,
      city: contrante.city,
      uf: contrante.uf,
    };

    return res.json({ serializedContrante });
  }

  // ediar dadfso do contratante
  async update(req: Request, res: Response) {
    const { id } = req.params;

    const contratanteId = await knex("contratantes")
      // .select("*")
      .where("id", id)
      .first();
    const contranteDdados = await knex("contratantes")
      .select("*")
      .where("id", id)
      .first();

    if (!contratanteId) {
      return res.status(400).json({ message: "Contratante not found..." });
    }

    const { nome, email, senha, telefone, city, uf } = req.body;

    const contratantes = {
      nome,
      email,
      senha,
      telefone,

      city,
      uf,
    };
    const trx = await knex.transaction();

    const atualizarDados = await trx("contratantes")
      .update(contratantes)
      .where("contratantes.id", "=", contranteDdados.id);
    await trx.commit();

    return res.json(atualizarDados);
  }

  //mostrar dados do contratante
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const contrante = await knex("contratantes").where("id", id).first();

    if (!contrante) {
      return res.status(400).json({ message: "Contrante not found..." });
    }

    const serelizedContrante = {
      ...contrante,
    };

    return res.json({ serelizedContrante });
  }

  //excluir contratante
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const contranteApagar = await knex("contratantes").where("id", id).first();

    if (!contranteApagar) {
      return res.status(400).json({ message: "Contratante not found..." });
    }

    await knex("contratantes").delete("*").where("contratantes.id", id);

    return res.json("Conta removida!");
  }
}
export default ContratanteController;
