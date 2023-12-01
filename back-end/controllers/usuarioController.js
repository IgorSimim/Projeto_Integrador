import { format } from "date-fns";
import { Usuario } from '../models/Usuario.js'
import dbKnex from '../databases/db_config.js'
import { Op } from "sequelize";


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
  const { nome, email, senha, cpf, telefone, idade, sexo, bairro, credito, debito, destaque, perfil } = req.body;

  if (!nome || !email || !senha || !cpf || !telefone || !idade || !sexo || !bairro || !perfil) {
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
      nome, email, senha, cpf, telefone, idade,
      sexo, bairro, credito, debito, destaque, perfil
    });

    // Função para formatar as datas
    const formattedUsuario = formatDates(usuario);

    res.status(200).json(formattedUsuario);
  } catch (error) {
    res.status(400).send(error);
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

  const { nome, email, senha, cpf, telefone, idade, sexo, bairro, credito, debito, destaque, perfil } = req.body;

  if (!nome || !email || !senha || !cpf || !telefone || !idade || !sexo || !bairro || !perfil) {
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
        destaque: destaque
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


export const usuarioLogin = async (req, res) => {

  const { email, senha } = req.body

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (usuario == null) {
      res.status(400).json({ erro: 'Login ou senha incorretos' })
      return
    }

    // Se encontrado, compara a criptografia da senha armazenada
    // com a criptografia da senha informada
    if (bcrypt.compareSync(senha, usuario.senha)) {
      res.status(200).json({ id: usuario.id, nome: usuario.nome })
    }
    else {
      res.status(401).json({ erro: 'Login ou senha incorretos' })
      return
    }
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