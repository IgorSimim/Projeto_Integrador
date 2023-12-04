import { Router } from "express"

import {
      confirmacaoConta,
      usuarioBairro, usuarioCartoes, usuarioCreate, usuarioDestaque, usuarioDestroy, usuarioFeminino,
      usuarioGeral, usuarioIdade, usuarioIndex, usuarioLogin, usuarioMasculino, usuarioPesq, usuarioUpdate
} from "./controllers/usuarioController.js"
import { adminCreate, adminDestroy, adminIndex } from "./controllers/adminController.js"
import { enviaEmail } from "./controllers/controllerMail.js"
import { ListaIndex, UsuarioLista, UsuarioPdf } from "./controllers/listaController.js"
import { postagemCreate, postagemDestaque, postagemDestroy, postagemIndex, postagemUpdate } from "./controllers/postagemController.js"

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
      .get('/postagens', postagemCreate)
      .delete('/postagens/:id', postagemDestroy)
      .put('/postagens/:id', postagemUpdate)
      .patch('/postagens/destaque/:id', postagemDestaque)

router.get('/admins', adminIndex)
      .post('/admins', adminCreate)
      .delete('/admins/:id', adminDestroy)

router.get('/enviaemail', enviaEmail)

export default router