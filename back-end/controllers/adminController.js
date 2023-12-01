import bcrypt from 'bcrypt'
import { format } from "date-fns";

import { Admin } from '../models/Admin.js'
// import { Log } from "../models/Log.js";

function validaSenha(senha) {

  const mensa = []

  // Retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // Percorre as letras da variável senha
  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

const formatDates = (admin) => {
  const formattedUpdatedAt = format(new Date(admin.updatedAt), 'dd/MM/yyyy HH:mm:ss');
  const formattedCreatedAt = format(new Date(admin.createdAt), 'dd/MM/yyyy HH:mm:ss');

  return {
    ...admin.toJSON(), // Converte o objeto admin para JSON
    updatedAt: formattedUpdatedAt,
    createdAt: formattedCreatedAt,
  };
};


export const adminIndex = async (req, res) => {
  try {
    const admins = await Admin.findAll();

    // Use a função para formatar as datas
    const formattedAdmins = admins.map(formatDates);

    res.status(200).json(formattedAdmins);
  } catch (error) {
    res.status(400).send(error)
  }
}

export const adminCreate = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ id: 0, msg: 'Erro... Informe os dados' });
    return;
  }

  const mensaValidacao = validaSenha(senha);
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao });
    return;
  }

  try {
    const admin = await Admin.create({
      nome: nome,
      email: email,
      senha: senha,
    });

    // Use a função para formatar as datas
    const formattedAdmin = formatDates(admin);

    res.status(201).json(formattedAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const adminDestroy = async (req, res) => {
  const { id } = req.params
  try {
    await Admin.destroy({ where: { id } });


    res.status(200).json({ msg: "Ok! Administrador excluído com sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}