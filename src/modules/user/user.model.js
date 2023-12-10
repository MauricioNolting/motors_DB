import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Users = sequelize.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('employee', 'client'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('avaible', 'unavaible'),
    defaultValue: 'avaible',
    allowNull: false,
  },
});

export default Users;
