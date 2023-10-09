import { Router } from "express"

import {
      usuarioBairro, usuarioCartoes, usuarioCreate, usuarioDestaque, usuarioDestroy, usuarioFeminino,
      usuarioGeral, usuarioIdade, usuarioIndex, usuarioMasculino, usuarioPesq, usuarioUpdate
} from "./controllers/usuarioController.js"
import { adminCreate, adminDestroy, adminIndex } from "./controllers/adminController.js"

import upload from './middlewares/FotoStore.js'

const router = Router()

router.get('/usuarios', usuarioIndex)
      .post('/usuarios', upload.single('perfil'), usuarioCreate)
      .patch('/usuarios/destaque/:id', usuarioDestaque)
      .put('/usuarios/:id', upload.single('perfil'), usuarioUpdate)
      .delete('/usuarios/:id', usuarioDestroy)
      .get('/usuarios/pesq/:id', usuarioPesq)


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