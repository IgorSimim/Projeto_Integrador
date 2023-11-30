import { Usuario } from 'your-path-to-this-file';
import bcrypt from 'bcrypt';
import sequelize, { DataTypes } from 'sequelize';

jest.mock('sequelize', () => {
  return {
    define: jest.fn(),
  };
});

jest.mock('bcrypt', () => {
  return {
    genSaltSync: jest.fn(),
    hashSync: jest.fn(),
  };
});

describe('Usuario Model', () => {
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
    sequelize.define.mockReturnValue(mockFn);
    bcrypt.genSaltSync.mockReturnValue('salt');
    bcrypt.hashSync.mockReturnValue('hashedPassword');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testing if the model was called with the correct parameters
  it('Should call Sequelize define model correctly', () => {
    expect(sequelize.define).toHaveBeenCalledWith(
      'usuario',  
      expect.objectContaining({
        id: expect.objectContaining({ 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }),
        
        // Validating the rest properties similarly...
        // nome, senha, email, cpf, etc...
      }),
      expect.objectContaining({ tableName: "usuario" })
    );
  });

  // Testing the before create hook
  it('Should hash password before creating a user', () => {
    let mockUsuario = { senha: 'plainTextPassword' };
    Usuario.beforeCreate(mockUsuario);

    expect(bcrypt.genSaltSync).toHaveBeenCalledWith(12);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(mockUsuario.senha, 'salt');
    expect(mockUsuario.senha).toBe('hashedPassword');
  });

  // Testing if the model has the correct associations defined
  it('Should call Sequelize hasMany and belongsTo for relationships', () => {
    expect(Usuario.belongsTo).toBeCalledWith(Admin, {
        foreignKey: expect.objectContaining({
            name: 'admin_id',
            allowNull: false
        }),
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    });

    expect(Admin.hasMany).toBeCalledWith(Usuario, {
        foreignKey: 'admin_id'
    });
  });
});