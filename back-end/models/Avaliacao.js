// import { DataTypes } from 'sequelize';
// import { sequelize } from '../databases/conecta.js';
// import { Churrascaria } from './Churrascaria.js';

// export const Avaliacao = sequelize.define('avaliacao', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   nome: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//   },
//   comentario: {
//     type: DataTypes.STRING(255),
//   },
//   nota: {
//     type: DataTypes.INTEGER(2),
//     allowNull: false
//   }
// }, {
//   tableName: "avaliacoes"
// });

// Avaliacao.belongsTo(Churrascaria, {
//   foreignKey: {
//     name: 'churrascaria_id',
//     allowNull: false
//   },
//   onDelete: 'RESTRICT',
//   onUpdate: 'CASCADE'
// })

// Churrascaria.hasMany(Avaliacao, {
//   foreignKey: 'churrascaria_id'
// })
