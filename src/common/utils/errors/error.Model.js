import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database/database.js';
4;
sequelize;

export const Error = sequelize.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  status: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stack: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
