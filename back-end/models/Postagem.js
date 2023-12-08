import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Usuario } from './Usuario.js';

export const Postagem = sequelize.define('postagem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  assunto: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  pet: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  },
  nomepet: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  tipo: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  raca: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  porte: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  sexo: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  idade: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null
  },
  fotopet: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  vacina: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  destaque: {
    type: DataTypes.TINYINT(1),
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: "postagem"
});

Postagem.belongsTo(Usuario, {
    foreignKey: {
      name: 'usuario_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Usuario.hasMany(Postagem, {
    foreignKey: 'usuario_id'
  })