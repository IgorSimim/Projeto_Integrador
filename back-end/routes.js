import { Router } from "express"

import {
      confirmacaoConta, usuarioBairro, usuarioCartoes, usuarioCreate, usuarioDestaque,
      usuarioDestroy, usuarioFeminino, usuarioGeral, usuarioIdade, usuarioIndex, usuarioLogin,
      usuarioMasculino, usuarioPesq, usuarioUpdate
} from "./controllers/usuarioController.js"
import { adminCreate, adminDestroy, adminIndex } from "./controllers/adminController.js"
import { enviaEmail } from "./controllers/controllerMail.js"
import { ListaIndex, UsuarioLista, UsuarioPdf } from "./controllers/listaUsuaController.js"
import {
      postagemComPet, postagemCreate, postagemDestaque, postagemDestroy, postagemGeral,
      postagemIndex, postagemPesq, postagemSemPet, postagemUpdate, postagemVacina
} from "./controllers/postagemController.js"
import {
      ListaPostCIndex, ListaPostSIndex, PostagemCLista,
      PostagemCPdf, PostagemSLista, PostagemSPdf
} from "./controllers/listaPostController.js"

const router = Router()

router.get('/usuarios', usuarioIndex)
      .post('/usuarios', usuarioCreate)
      .delete('/usuarios/:id', usuarioDestroy)
      .put('/usuarios/:id', usuarioUpdate)
      .patch('/usuarios/destaque/:id', usuarioDestaque)
      .get('/usuarios/pesq/:id', usuarioPesq)
      .post('/login', usuarioLogin)
      .get('/confirmacao/:hash', confirmacaoConta)

      .get('/listausuarios', ListaIndex)
      .get('/usuarios/lista', UsuarioLista)
      .get('/usuarios/pdf', UsuarioPdf)


      .get('/usuarios/geral', usuarioGeral)
      .get('/usuarios/bairro', usuarioBairro)
      .get('/usuarios/sexo/masculino', usuarioMasculino)
      .get('/usuarios/sexo/feminino', usuarioFeminino)
      .get('/usuarios/cartoes', usuarioCartoes)
      .get('/usuarios/idade', usuarioIdade)

router.get('/postagens', postagemIndex)
      .post('/postagens', postagemCreate)
      .delete('/postagens/:id', postagemDestroy)
      .put('/postagens/:id', postagemUpdate)
      .patch('/postagens/destaque/:id', postagemDestaque)
      .get('/postagens/pesq/:id', postagemPesq)

      .get('/listapostagenscompet', ListaPostCIndex)
      .get('/postagenscompet/lista', PostagemCLista)
      .get('/postagenscompet/pdf', PostagemCPdf)

      .get('/listapostagenssempet', ListaPostSIndex)
      .get('/postagenssempet/lista', PostagemSLista)
      .get('/postagenssempet/pdf', PostagemSPdf)


      .get('/postagens/geral', postagemGeral)
      .get('/postagens/sempet', postagemSemPet)
      .get('/postagens/compet', postagemComPet)
      .get('/postagens/compet/cartaovacina', postagemVacina)

router.get('/admins', adminIndex)
      .post('/admins', adminCreate)
      .delete('/admins/:id', adminDestroy)

router.get('/enviaemail', enviaEmail)

export default router