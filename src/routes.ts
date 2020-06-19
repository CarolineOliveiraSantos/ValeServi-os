import express from "express";
const { Router } = require("express");

const routes = express.Router();
import multer from "multer";
import { Joi, celebrate } from "celebrate";
import multerConfig from "../src/config/multer";

import PrestadorController from "./controllers/PrestadorController";
import ServicosController from "./controllers/ServicoController";
import ContratanteController from "./controllers/ContratanteController";
import ContratosController from "./controllers/ContratosController";

const prestadorController = new PrestadorController();
const servicosController = new ServicosController();
const contratanteController = new ContratanteController();
const contratosController = new ContratosController();

const upload = multer(multerConfig);




//PRESTADOR
//cadastrar prestador de servico
routes.post(
  "/criarPrestador",
  upload.single("img"),
  celebrate(
    {
      body: Joi.object().keys({
        cpf: Joi.string().required(),
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        senha: Joi.string().required(),
        telefone: Joi.string().required(),
        sobre: Joi.string().required(),
        referencia: Joi.string().required(),
        servicos: Joi.string().required(),
        img_url: Joi.string().required(),
        descricao: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  prestadorController.create
);
//Editar prestador
routes.put(
  "/editarPrestador/:id",
  upload.single("img"),
  celebrate(
    {
      body: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        senha: Joi.string().required(),
        telefone: Joi.string().required(),
        sobre: Joi.string().required(),
        referencia: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  prestadorController.update
);
// mostrar dados do prestador
routes.get("/prestador/:id", prestadorController.show);
//apagar prestador
routes.delete("/prestadorDeletar/:id", prestadorController.delete);
//mostrar detalhes do prestador
routes.get("/prestadorDetalhe/:id", prestadorController.detalhe);
//Listar Prestador por cidade
routes.get("/prestadorCity/", prestadorController.index);
//Listar Todods os prestadores
routes.get("/prestadoresAll/", prestadorController.indexx);

// SERVIÇOS

//listar serviços
routes.get("/servicos", servicosController.index);
//mostrar um serviço
routes.get("/servicos/:id", servicosController.show);
//Editar um serviço do prestador
// routes.put("/servicosEditar/:id", servicosController.update);

routes.get("/servicos/comprovante/:id", servicosController.comprovante)



//contratantes
//cadastrar prestador de servico
routes.post(
  "/criarContratante",
  celebrate(
    {
      body: Joi.object().keys({
        cpf: Joi.string().required(),
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        senha: Joi.string().required(),
        telefone: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  contratanteController.create
);
// ver detalhe do contratante
routes.get("/contratanteMostrar/:id", contratanteController.detalhe);
// editar contratante
routes.put(
  "/editarContratante/:id",
  celebrate(
    {
      body: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        senha: Joi.string().required(),
        telefone: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  contratanteController.update
);
//listar dados do contratante
routes.get("/contratanteDados/:id", contratanteController.show);

//apagar contratante
routes.delete("/contratanteDeletar/:id", contratanteController.delete);

// CONTRATOS
//efetuar contrato
routes.post(
  "/efetuarContrato",
  celebrate(
    {
      body: Joi.object().keys({
        data: Joi.string().required(),
        email: Joi.string().required().email(),
        contratante_id: Joi.number().required(),
        servico_id: Joi.number().required(),
        prestador_id: Joi.number().required(),
        rua: Joi.string().required(),
        numero: Joi.string().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  contratosController.create
);
//editar contrato
//CONTRATANTE
routes.put(
  "/editarContratoContratante/:id",
  celebrate(
    {
      body: Joi.object().keys({
        data: Joi.string().required(),
        email: Joi.string().required().email(),
        avaliacao: Joi.string(),
        rua: Joi.string().required(),
        numero: Joi.string().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  contratosController.updateC
);
//PRESTADOR
routes.put(
  "/editarContratoPrestador/:id",
  celebrate(
    {
      body: Joi.object().keys({
        data: Joi.string().required(),
        status: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  contratosController.updateP
);
//Ver contrato por id do contratante
routes.get("/verContrato/:id", contratosController.show);

export default routes;
