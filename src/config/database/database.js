import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';
envs;

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conection has been established successfully :)');
  } catch (error) {
    console.log(error);
  }
};

export const syncUp = async () => {
  try {
    await sequelize.sync();
    console.log('conection has been synced succesfully');
  } catch (error) {
    console.log(error);
  }
};

export { sequelize };
