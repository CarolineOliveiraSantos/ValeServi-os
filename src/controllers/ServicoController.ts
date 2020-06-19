import knex from "../database/connection";
import { Request, Response } from "express";

class ServicosController {
  async index(req: Request, res: Response) {
    const servicos = await knex("servicos").select("*");

    const serializedservicos = servicos.map((servico) => {
      return {
        id: servico.id,
        name: servico.name,
        info: servico.info,
        img: `http://192.168.42.3:3333/uploads/${servico.img}`,
      };
    });

    console.log("funcionou AAAAAAAAAAAA");
    return res.json(serializedservicos);
  }
  async comprovante(req: Request, res: Response){
    const { id } = req.params;

    const comprovante = await knex("contratos").select("*").where("id", id);

    if (!comprovante) {
      return res.status(400).json({ message: "Contrato not found..." });
    }   
        
    const serializedContrato = comprovante.map((contrato) => {
      return {
    data: contrato.data,
   rua: contrato.rua,
    numero: contrato.numero,      };
    })
    const prestadorS = await knex("prestadores")
    .join(
      "contratos",
      "prestadores.id",
      "=",
      "contratos.prestador_id"
    )
    .where("contratos.id", id);

  const serializedPrestador = prestadorS.map((prestador) => {
    return {
      nome: prestador.nome,
      telefone: prestador.telefone,
    };
  });
  
  const contratanteServico = await knex("contratantes")
  .join(
    "contratos",
    "contratantes.id",
    "=",
    "contratos.contratante_id"
  )
  .where("contratos.id", id);

const serializedContratante = contratanteServico.map((contratante) => {
  return {
    nome: contratante.nome,
    telefone: contratante.telefone,
  };
});  

const serivicoPrestado = await knex("serv_prestado")
.join(
  "contratos",
  "serv_prestado.id",
  "=",
  "contratos.servico_id"
)
.where("contratos.id", id);


const serializedServico = serivicoPrestado.map((servico) => {
return {
  descricao: servico.descricao,
};
});

   return res.json({ comprovante: serializedContrato, serializedContratante, serializedServico, serializedPrestador });

  }
  //listar um prestadores do serviço
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const servico = await knex("servicos").where("id", id).first();

    if (!servico) {
      return res.status(400).json({ message: "Prestador not found..." });
    }

    const serializedServico = {
      ...servico,
    };

    const prestadorS = await knex("prestadores")
      .join(
        "serv_prestado",
        "prestadores.id",
        "=",
        "serv_prestado.prestador_id"
      )
      .where("serv_prestado.servico_id", id);

    const serializedPrestador = prestadorS.map((prestador) => {
      return {
        nome: prestador.nome,
        telefone: prestador.telefone,
        sobre: prestador.sobre,
      };
    });

    return res.json({ servico: serializedServico, serializedPrestador });
  }

}
export default ServicosController;
