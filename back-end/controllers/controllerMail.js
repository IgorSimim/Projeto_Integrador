import nodemailer from "nodemailer"
import { Usuario } from "../models/Usuario.js";
import md5 from 'md5'

export async function main(nome, email, hash) {

  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "5b0a16123a51cd",
      pass: "454fc830ae4b29"
    },
  });

  const link = "http://localhost:3000/confirmacao/" + hash

  let mensa = "<h5>Social Pet</h5>"
  mensa += `<h6>Estimado: ${nome}</h6>`
  mensa += "<h6>Você cadastrou uma nova conta. "
  mensa += "Clique no link abaixo para confirmar seu cadatro:</h6>"
  mensa += `<a href="${link}">Confirmação do cadastro</a>`


  let info = await transporter.sendMail({
    from: '"Social pet" <socialpetpel@email.com>',
    to: email,
    subject: "Confirmação da conta",
    text: `Copie e cole o endereço: ${link} para confirmar seu cadastro`,
    html: mensa, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export const enviaEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (usuario == null) {
      res.status(400).json({ erro: "Erro... E-mail inválido" });
      return;
    }

    // Gere o hash de confirmação
    const hash = md5(usuario.nome + email + Date.now());

    // Atualize o hash no modelo Usuario
    await usuario.update({ hash });

    // Envie o e-mail com o link de confirmação
    main(usuario.nome, email, hash).catch(console.error);

    res.status(200).json({ msg: "Ok. E-mail para confirmação enviado com sucesso" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const confirmacaoConta = async (req, res) => {
  const hash = req.params.hash;
  console.log("Rota de confirmação acessada. Hash:", hash);

  try {
    const usuario = await Usuario.findOne({ where: { hash } });

    if (usuario == null) {
      res.status(400).json({ erro: "Erro... Link de confirmação inválido" });
      return;
    }

    // Verifique se o usuário já foi confirmado anteriormente
    if (usuario.confirmado === 1) {
      res.status(200).json({ msg: "Sua conta já foi confirmada anteriormente." });
      return;
    }

    // Atualize o atributo confirmado para 1
    await usuario.update({ confirmado: 1 });

    // Exiba a mensagem de confirmação na tela
    res.status(200).json({ msg: "Conta confirmada com sucesso. Você já pode fazer login." });
  } catch (error) {
    res.status(400).json(error);
  }
}