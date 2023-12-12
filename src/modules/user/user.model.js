import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
import { encryptedPassword } from '../../config/pluggins/encripted-password.pluggin.js';

export const Users = sequelize.define(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER(),
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM('employee', 'client'),
      allowNull: false,
      defaultValue: 'client',
    },
    passwordChangedAt: {
      type: DataTypes.DATE(),
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM('avaible', 'unavaible'),
      defaultValue: 'avaible',
      allowNull: false,
    },
  },
  {
    hooks: {
      //antes de que se cree un registro. user es el registro que se va a crear
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);
