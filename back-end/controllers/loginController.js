import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'
dotenv.config()

import { Usuario } from "../models/Usuario.js";

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body
    // evita de que a mensagem dê "pistas" para um possível invasor
    const mensaErroPadrao = "Erro... Login ou senha inválido"

  
    if (!email || !senha) {
      res.status(400).json({ id: 1, msg: "Informe e-mail e senha de acesso" })
      // res.status(400).json({ id: 1, msg: mensaErroPadrao})
      return
    }
  
    // verifica se o e-mail está cadastrado
    try {
      const usuario = await Usuario.findOne({ where: { email } })

  
      if (usuario == null) {
        res.status(400).json({ id: 2, msg: "Erro... Usuário não cadastrado" });
        return
      }

      if (usuario.confirmado === 0) {
        return res.status(400).json({ id: 3, msg: 'Lembre de confirmar sua conta antes de fazer login' });
      }
  
      if (bcrypt.compareSync(senha, usuario.senha)) {
        const token = jwt.sign({
          user_logado_id: usuario.id,
          user_logado_nome: usuario.nome
        },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        )
  
        res.status(200).json({msg: "Ok. Logado", token})
      } else {
  
        // res.status(400).json({ erro: "Erro... Senha inválida" })      
        res.status(400).json({ id: 4, msg: mensaErroPadrao})
      }
    } catch (error) {
      res.status(400).json(error)
    }
  }