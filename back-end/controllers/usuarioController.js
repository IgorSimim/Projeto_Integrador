import { format, differenceInYears } from "date-fns";
import md5 from 'md5';
import { Usuario } from '../models/Usuario.js'
import dbKnex from '../databases/db_config.js'
import { Op } from "sequelize";
import { main } from "./controllerMail.js";

function validaSenha(senha) {
  const mensa = [];

  // Retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("A senha deve possuir no mínimo 8 caracteres");
  }

  // contadores
  let pequenas = 0;
  let grandes = 0;
  let numeros = 0;
  let simbolos = 0;

  // Percorre as letras da variável senha
  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) {
      pequenas++;
    } else if ((/[A-Z]/).test(letra)) {
      grandes++;
    } else if ((/[0-9]/).test(letra)) {
      numeros++;
    } else {
      simbolos++;
    }
  }

  if (pequenas === 0 || grandes === 0 || numeros === 0 || simbolos === 0) {
    mensa.push("A senha deve possuir letras minúsculas, maiúsculas, números e símbolos");
  }

  return mensa;
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
    const usuarios = await Usuario.findAll();

    // Função para formatar as datas
    const formattedUsuarios = usuarios.map(formatDates);

    res.status(200).json(formattedUsuarios);
  } catch (error) {
    res.status(400).send(error)
  }
}


export const usuarioCreate = async (req, res) => {
  const { nome, email, senha, cpf, telefone, dtnasc, sexo, bairro, credito, debito, destaque, perfil, confirmado } = req.body;

  if (!nome || !email || !senha || !cpf || !telefone || !dtnasc || !sexo || !bairro || !perfil) {
    res.status(400).json({ id: 1, msg: 'Erro... Informe os dados' });
    return;
  }

  // if (confirmado !== 0 && confirmado !== 1) {
  //   res.status(400).json({ id: 2, msg: "Certifique-se que o campo CONFIRMADO seja preenchido apenas com 0 ou 1" });
  //   return;
  // }

  const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailTest.test(email)) {
    res.status(400).json({ id: 3, msg: "Certifique-se que o campo EMAIL esteja preenchido no formato correto" });
    return;
  }

  const mensaValidacao = validaSenha(senha);
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 4, msg: mensaValidacao.join(', ') });
    return;
  }

  // Verifica se já existe um usuário com o mesmo CPF
  const usuarioExistente = await Usuario.findOne({ where: { cpf } });

  if (usuarioExistente) {
    res.status(400).json({ id: 5, msg: 'Já existe um usuário com este CPF. Por favor, informe outro.' });
    return;
  }

  const cpfTest = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfTest.test(cpf)) {
    res.status(400).json({ id: 6, msg: "Certifique-se que o campo CPF esteja preenchido no formato correto" });
    return;
  }

  const telTest = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!telTest.test(telefone)) {
    res.status(400).json({ id: 7, msg: "Certifique-se que o campo TELEFONE esteja preenchido no formato correto" });
    return;
  }

  // Calcula a idade com base na data de nascimento
  const idade = differenceInYears(new Date(), new Date(dtnasc));

  if (idade < 18) {
    res.status(400).json({ id: 8, msg: "Verifique o campo idade. Site restrito para maiores de idade, 18 ou mais" });
    return;
  }

  const urlTest = /\.(jpg|png)$/;
  if (!urlTest.test(perfil)) {
    res.status(400).json({ id: 9, msg: "Certifique-se que o campo URL esteja preenchido com uma URL válida terminando em .jpg ou .png" });
    return;
  }


  try {
    let hash = md5(nome + email + Date.now());

    const usuario = await Usuario.create({
      nome, email, senha, cpf, telefone, dtnasc,
      sexo, bairro, perfil, credito, debito, destaque, confirmado, hash
    });

    main(usuario.nome, usuario.email, hash).catch(console.error);

    // Função para formatar as datas
    const formattedUsuario = formatDates(usuario);

    res.status(200).json(formattedUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ id: 6, msg: "Erro interno ao criar usuário" });
  }
}


export const confirmacaoConta = async (req, res) => {
  const { hash } = req.params;

  try {
    // Procurar o usuário pelo hash
    const usuario = await Usuario.findOne({ where: { hash } });

    if (!usuario) {
      res.status(400).json({ erro: "Erro... Link de confirmação inválido" });
      return;
    }

    // Atualize o atributo 'confirmado' para 1
    await usuario.update({ confirmado: true });

    res.status(200).json({ msg: "Conta confirmada com sucesso" });
  } catch (error) {
    res.status(400).json(error);
  }
};




export const usuarioDestaque = async (req, res) => {
  const { id } = req.params;

  try {
    // Retorna o registro para obter o status atual do campo destaque
    const usuario = await Usuario.findByPk(id)

    // Altera com o contrário do atual
    await Usuario.update({ destaque: !usuario.destaque }, { where: { id } })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};


export const usuarioUpdate = async (req, res) => {
  const { id } = req.params;

  const { nome, email, senha, cpf, telefone, dtnasc, sexo, bairro, credito, debito, destaque, perfil, confirmado } = req.body;

  if (!nome || !email || !senha || !cpf || !telefone || !dtnasc || !sexo || !bairro || !perfil) {
    res.status(400).json({ id: 1, msg: 'Erro... Informe os dados' });
    return;
  }

  // if (confirmado !== 0 && confirmado !== 1) {
  //   res.status(400).json({ id: 2, msg: "Certifique-se que o campo CONFIRMADO seja preenchido apenas com 0 ou 1" });
  //   return;
  // }

  const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailTest.test(email)) {
    res.status(400).json({ id: 3, msg: "Certifique-se que o campo EMAIL esteja preenchido no formato correto" });
    return;
  }

  const mensaValidacao = validaSenha(senha);
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 4, msg: mensaValidacao.join(', ') });
    return;
  }

  const cpfTest = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfTest.test(cpf)) {
    res.status(400).json({ id: 6, msg: "Certifique-se que o campo CPF esteja preenchido no formato correto" });
    return;
  }

  const telTest = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!telTest.test(telefone)) {
    res.status(400).json({ id: 7, msg: "Certifique-se que o campo TELEFONE esteja preenchido no formato correto" });
    return;
  }

  // Calcula a idade com base na data de nascimento
  const idade = differenceInYears(new Date(), new Date(dtnasc));

  if (idade < 18) {
    res.status(400).json({ id: 8, msg: "Verifique o campo idade. Site restrito para maiores de idade, 18 ou mais" });
    return;
  }

  const urlTest = /\.(jpg|png)$/;
  if (!urlTest.test(perfil)) {
    res.status(400).json({ id: 9, msg: "Certifique-se que o campo URL esteja preenchido com uma URL válida terminando em .jpg ou .png" });
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
        dtnasc: dtnasc,
        sexo: sexo,
        bairro: bairro,
        credito: credito,
        debito: debito,
        perfil: perfil,
        destaque: destaque,
        confirmado: confirmado
      })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 6, msg: "Erro: " + error.message })
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
    const usuario = await Usuario.findByPk(id)
    res.status(200).json(usuario)
  } catch (error) {
    res.status(400).send(error)
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