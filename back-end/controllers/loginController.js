import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'
dotenv.config()

import { Usuario } from "../models/Usuario.js";

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body
    // evita de que a mensagem dê "pistas" para um possível invasor
    const mensaErroPadrao = "Erro... Login ou senha inválido"

    console.log('Senha digitada:', senha);
    console.log('Senha digitada:', email);

  
    if (!email || !senha) {
  //    res.status(400).json({ erro: "Informe e-mail e senha de acesso" })
      res.status(400).json({ erro: mensaErroPadrao})
      return
    }
  
    // verifica se o e-mail está cadastrado
    try {
      const usuario = await Usuario.findOne({ where: { email } })

      console.log('Senha digitada:', senha);
    console.log('Senha armazenada:', usuario.senha);
  
      if (usuario == null) {
        // res.status(400).json({ erro: "Erro... E-mail inválido" })
        res.status(400).json({ erro: "Erro... Usuário não cadastrado"})
        return
      }

      if (usuario.confirmado === 0) {
        return res.status(400).json({ erro: 'Lembre de confirmar sua conta antes de fazer login.' });
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
        res.status(400).json({ erro: mensaErroPadrao})
      }
    } catch (error) {
      res.status(400).json(error)
    }
  }