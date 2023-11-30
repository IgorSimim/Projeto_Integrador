import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "projetointegrador", // Nome do banco de dados
  "root", // Nome de usuário
  "", // Senha
  {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    charset: 'utf8mb4', // Conjunto de caracteres
    collate: 'utf8mb4_unicode_ci' // Colação
  }
);