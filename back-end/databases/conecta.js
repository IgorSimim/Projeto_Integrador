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


// Função para executar uma consulta personalizada
// export async function customQuery(queryString, replacements = []) {
//   try {
//     if (!queryString || typeof queryString !== 'string') {
//       throw new Error('Consulta SQL inválida');
//     }

//     const result = await sequelize.query(queryString, {
//       replacements,
//       type: sequelize.QueryTypes.SELECT,
//     });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }
