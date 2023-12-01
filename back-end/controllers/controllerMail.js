import nodemailer from "nodemailer"
import { Usuario } from "../models/Usuario.js";
import md5 from 'md5'

async function main(nome, email, hash) {


  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, 
    auth: {
      user: "5b0a16123a51cd",
      pass: "454fc830ae4b29"
    },
  });

  const link = "http://localhost:3000/trocasenha/"+hash

  let mensa = "<h5>Sistema de Avaliação de Churrascarias</h5>"
  mensa += `<h6>Estimado: ${nome}</h6>`
  mensa += "<h6>Você solicitou a troca de senha. "
  mensa += "Clique no link abaixo para alterar:</h6>"
  mensa += `<a href="${link}">Alterar sua senha</a>`


  let info = await transporter.sendMail({
    from: '"Social pet" <socialpetpel@email.com>', 
    to: email, 
    subject: "Solicitação Alteração de Senha", 
    text: `Copie e cole o endereço: ${link} para alterar`, 
    html: mensa, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export const enviaEmail = async (req, res) => {
  const { email } = req.body
  try {
    const usuario = await Usuario.findOne({ where: { email } })

    if (usuario == null) {
      res.status(400).json({ erro: "Erro... E-mail inválido" })
      return
    }
    const hash = md5(usuario.nome + email + Date.now())
    main(usuario.nome, email, hash).catch(console.error);

    res.status(200).json({ msg: "Ok. E-mail para alteração enviado com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}  