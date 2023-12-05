import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Usuario } from './models/Usuario.js'
import { Admin } from './models/Admin.js'
import { Postagem } from './models/Postagem.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');

    await Admin.sync()
    await Usuario.sync({alter: true})
    await Postagem.sync({alter: true})
  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API do Projeto Integrador')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})