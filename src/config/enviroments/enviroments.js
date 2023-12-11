import dotenv from 'dotenv';
dotenv.config();

import envVar from 'env-var';

export const envs = {
  PORT: envVar.get('PORT').required().asPortNumber(),
  DB_URI: envVar.get('DB_URI').required().asString(),
  NODE_ENV: envVar.get('NODE_ENV').required().asString(),
};
