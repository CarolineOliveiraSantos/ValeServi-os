import knex from "../database/connection";
import { Request, Response } from "express";

class ContratosController {
  //efetuar contrato de serviço
  async create(req: Request, res: Response) {
    const {
      data,
      email,
      contratante_id,
      servico_id,
      prestador_id,
      rua,
      numero,
      latitude,
      longitude,
      city,
      uf,
    } = req.body;

    const trx = await knex.transaction();

    const contratos = {
      data,
      email,
      status: "Pendente",
      avaliacao: " ",
      contratante_id,
      prestador_id,
      servico_id,
      rua,
      numero,
      latitude,
      longitude,
      city,
      uf,
    };
    const contratosCriar = await trx("contratos").insert(contratos);

    await trx.commit();

    return res.json({ contratosCriar });
  }

  // ediar dadfso do contrato Contratante
  async updateC(req: Request, res: Response) {
    const { id } = req.params;

    const contratoID = await knex("contratos")
      // .select("*")
      .where("id", id)
      .first();
    const contratoDados = await knex("contratos")
      .select("*")
      .where("id", id)
      .first();

    if (!contratoID) {
      return res.status(400).json({ message: "Contrato not found..." });
    }

    const {
      data,
      email,
      avaliacao,
      rua,
      numero,
      latitude,
      longitude,
      city,
      uf,
    } = req.body;

    const contratoEditar = {
      data,
      email,
      avaliacao,
      rua,
      numero,
      latitude,
      longitude,
      city,
      uf,
    };
    const trx = await knex.transaction();

    const atualizarDados = await trx("contratos")
      .update(contratoEditar)
      .where("contratos.id", "=", contratoDados.id);
    await trx.commit();

    return res.json(atualizarDados);
  }
  // ediar dadfso do contrato Prestador
  async updateP(req: Request, res: Response) {
    const { id } = req.params;

    const contratoID = await knex("contratos")
      // .select("*")
      .where("id", id)
      .first();
    const contratoDados = await knex("contratos")
      .select("*")
      .where("id", id)
      .first();

    if (!contratoID) {
      return res.status(400).json({ message: "Contrato not found..." });
    }

    const { data, status } = req.body;

    const contratoEditar = {
      data,
      status,
    };
    const trx = await knex.transaction();

    const atualizarDados = await trx("contratos")
      .update(contratoEditar)
      .where("contratos.id", "=", contratoDados.id);
    await trx.commit();

    return res.json(atualizarDados);
  }

  // mostrar contrato
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const trxx = await knex.transaction();

    const contrato = await trxx("contratos").where("id", id).first();

    if (!contrato) {
      return res.status(400).json({ message: "Contrato not found..." });
    }
    const serializedContrato = {
      data: contrato.data,
      email: contrato.email,
      status: contrato.status,
      avaliacao: contrato.avaliacao,
      rua: contrato.rua,
      numero: contrato.numero,
      city: contrato.city,
      uf: contrato.uf,
    };

    // COMPARAR O SERVPRESTADO COM O SERVICO DO CONTRATO
    // PEGAR O ID DO PRESTDAOR, VINDO DO SERVICO PRESTADO,
    // COMPARAR COM O ID DO PRESTADOR
    // PEGAR OS DADOS DESSE PRESTADOR

    const idServico = await trxx("contratos")
      .join("serv_prestado", "serv_prestado.id", "=", "contratos.servico_id")
      .where("contratos.id", "=", id);

    const serializedServicoPrestado = idServico.map((servicoPrest) => {
      return {
        id: servicoPrest.id,
        descricao: servicoPrest.descricao,
        img: servicoPrest.img_url,
      };
    });

    const idPrestador = await trxx("prestadores")
      .join("contratos", "prestadores.id", "=", "contratos.prestador_id")
      .where("contratos.id", id);

    const serializedPrestadorDados = idPrestador.map((prestadorDoServico) => {
      return {
        id: prestadorDoServico.id,
        nome: prestadorDoServico.nome,
        telefone: prestadorDoServico.telefone,
      };
    });

    await trxx.commit();

    return res.json({
      contrato: serializedContrato,
      serializedServicoPrestado,
      serializedPrestadorDados,
    });
  }
}
export default ContratosController;
