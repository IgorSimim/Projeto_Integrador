import { format } from "date-fns";
import { Usuario } from '../models/Usuario.js'
import { Admin } from '../models/Admin.js'
import dbKnex from '../databases/db_config.js'
import { Op } from "sequelize";

import fs from 'fs';


function validaSenha(senha) {

  const mensa = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
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

const formatDates = (usuario) => {
  const formattedUpdatedAt = format(new Date(usuario.updatedAt), 'dd/MM/yyyy HH:mm:ss');
  const formattedCreatedAt = format(new Date(usuario.createdAt), 'dd/MM/yyyy HH:mm:ss');

  return {
    ...usuario.toJSON(), // Converte o objeto usuario para JSON
    updatedAt: formattedUpdatedAt,
    createdAt: formattedCreatedAt,
  };
};

export const usuarioIndex = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: Admin });

    // Use a função para formatar as datas em cada administrador
    const formattedUsuarios = usuarios.map(formatDates);

    res.status(200).json(formattedUsuarios);
  } catch (error) {
    res.status(400).send(error)
  }
}

export const usuarioCreate = async (req, res) => {

  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const perfil = req.file.path;

  if ((req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') || req.file.size > 2048 * 2048) {
    fs.unlinkSync(perfil);
    res.status(400).json({ msg: 'Formato inválido da imagem ou imagem muito grande' });
    return;
  }

  const { nome, email, senha, cpf, telefone, idade, sexo, bairro, credito, debito, destaque, admin_id } = req.body;

  // se não informou estes atributos
  if (!nome || !email || !senha || !cpf || !telefone || !idade || !sexo || !bairro || !destaque || !admin_id) {
    res.status(400).json({ id: 0, msg: 'Erro... Informe os dados' });
    return;
  }

  const mensaValidacao = validaSenha(senha);
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao });
    return;
  }

  if (idade < 18) {
    res.status(400).json({ id: 0, msg: "Verifique o campo idade. Lembramos que este site é para maiores de idade, 18 ou mais" });
    return;
  }

  if (cpf.length < 14 || cpf.length > 14) {
    res.status(400).json({ id: 0, msg: "Certifique-se que o campo cpf esteja preenchido no modelo correto" });
    return;
  }

  try {
    const usuario = await Usuario.create({
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf,
      telefone: telefone,
      idade: idade,
      sexo: sexo,
      bairro: bairro,
      credito: credito,
      debito: debito,
      perfil: perfil,
      destaque: destaque,
      admin_id: admin_id,
    });

    // Use a função para formatar as datas
    const formattedUsuario = formatDates(usuario);

    res.status(201).json(formattedUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const usuarioDestaque = async (req, res) => {
  const { id } = req.params;

  try {
    // Busque o registro do banco de dados pelo ID
    const usuario = await dbKnex("usuario").where({ id }).first();

    // Inverta o valor do destaque
    const novoValorDestaque = !usuario.destaque;

    // Atualize o registro no banco de dados com o novo valor de destaque
    await dbKnex("usuario").where({ id }).update({ destaque: novoValorDestaque });

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};


export const usuarioUpdate = async (req, res) => {
  const { id } = req.params;

  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const perfil = req.file.path;

  if ((req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') || req.file.size > 2048 * 2048) {
    fs.unlinkSync(perfil);
    res.status(400).json({ msg: 'Formato inválido da imagem ou imagem muito grande' });
    return;
  }


  const { nome, email, senha, cpf, telefone, idade, sexo, bairro, credito, debito, destaque, confirmacao, admin_id } = req.body

  if (!nome || !email || !senha || !cpf || !telefone || !idade || !sexo || !bairro || !destaque || !confirmacao || !admin_id) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe nome, email, senha, cpf, telefone, idade, sexo, bairro, credito, debito, destaque, confirmacao, admin_id e a URL da foto de Perfil"
      })
    return
  }

  const mensaValidacao = validaSenha(senha);
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao });
    return;
  }

  if (idade < 18) {
    res.status(400).json({ id: 0, msg: "Verifique o campo idade. Lembramos que este site é para maiores de idade, 18 ou mais" });
    return;
  }

  if (cpf.length < 14 || cpf.length > 14) {
    res.status(400).json({ id: 0, msg: "Certifique-se que o campo cpf esteja preenchido no modelo correto" });
    return;
  }

  try {
    await dbKnex("usuario").where({ id })
      .update({
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        telefone: telefone,
        idade: idade,
        sexo: sexo,
        bairro: bairro,
        credito: credito,
        debito: debito,
        perfil: perfil,
        destaque: destaque,
        confirmacao: confirmacao,
        admin_id: admin_id
      })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }

}

export const usuarioDestroy = async (req, res) => {
  const { id } = req.params
  try {
    await Usuario.destroy({ where: { id } });


    res.status(200).json({ msg: "Ok! Usuário excluído com sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const usuarioPesq = async (req, res) => {

  const { id } = req.params

  try {
    const usuario = await dbKnex("usuario").where('id', id).select("id", "nome", "email", "senha", "cpf",
      "telefone", "idade", "sexo", "bairro", "credito", "debito", "perfil", "destaque", "confirmacao", "admin_id")
    if (!usuario) {
      res.status(404).json({ msg: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
}

export const usuarioGeral = async (req, res) => {
  try {
    const consulta = await dbKnex("usuario")
      .count({ total: "*" });

    const { total } = consulta[0];

    res.status(200).json({ total });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};


export const usuarioBairro = async (req, res) => {
  try {
    const consulta = await dbKnex("usuario")
      .select("bairro")
      .count({ num: "*" }).groupBy("bairro")


    res.status(200).json(consulta)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const usuarioMasculino = async (req, res) => {
  try {
    const consulta = await Usuario.count({
      where: {
        sexo: "Masculino",
      },
    });

    const resultado = { nummasc: consulta };

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const usuarioFeminino = async (req, res) => {
  try {
    const consulta = await Usuario.count({
      where: {
        sexo: "Feminino",
      },
    });

    const resultado = { numfem: consulta };

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const usuarioCartoes = async (req, res) => {
  try {

    const consulta = await Usuario.count({
      where: {
        [Op.or]: [
          { credito: { [Op.not]: "" } },
          { debito: { [Op.not]: "" } }
        ]
      },
    });

    // Criar um objeto com a chave "num" e o valor da contagem
    const resultado = { num: consulta };

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};


export const usuarioIdade = async (req, res) => {
  try {
    const consulta = await dbKnex("usuario")
      .select("idade")
      .count({ num: "*" })
      .groupBy("idade");

    res.status(200).json(consulta);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};