import { Router } from "express"

import {
      usuarioBairro, usuarioCartoes, usuarioCreate, usuarioDestaque, usuarioDestroy, usuarioFeminino,
      usuarioGeral, usuarioIdade, usuarioIndex, usuarioLogin, usuarioMasculino, usuarioPesq, usuarioUpdate
} from "./controllers/usuarioController.js"
import { adminCreate, adminDestroy, adminIndex } from "./controllers/adminController.js"

const router = Router()

router.get('/usuarios', usuarioIndex)
      .post('/usuarios', usuarioCreate)
      .delete('/usuarios/:id', usuarioDestroy)
      .put('/usuarios/:id', usuarioUpdate)
      .patch('/usuarios/destaque/:id', usuarioDestaque)
      .get('/usuarios/pesq/:id', usuarioPesq)
      .post('/login', usuarioLogin)


      .get('/usuarios/geral', usuarioGeral)
      .get('/usuarios/bairro', usuarioBairro)
      .get('/usuarios/sexo/masculino', usuarioMasculino)
      .get('/usuarios/sexo/feminino', usuarioFeminino)
      .get('/usuarios/cartoes', usuarioCartoes)
      .get('/usuarios/idade', usuarioIdade)

router.get('/admins', adminIndex)
      .post('/admins', adminCreate)
      .delete('/admins/:id', adminDestroy)

export default router