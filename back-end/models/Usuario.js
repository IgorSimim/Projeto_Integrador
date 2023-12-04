import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'
import { sequelize } from '../databases/conecta.js';

export const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER(3),
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: 'NI'
  },
  bairro: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  credito: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  debito: {
    type: DataTypes.STRING(40),
    allowNull: true,
    defaultValue: null
  },
  perfil: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  destaque: {
    type: DataTypes.TINYINT(1),
    allowNull: true,
    defaultValue: 0
  },
  confirmado: {
    type: DataTypes.TINYINT(1),
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: "usuario"
});

// Hook (gancho) do Sequelize que é executado antes 
// da inserção de um registro.
// Faz a criptografia da senha e atribui o hash ao campo senha
Usuario.beforeCreate(usuario => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(usuario.senha, salt)
  usuario.senha = hash  
});