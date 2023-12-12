import express from 'express';
import router from './routes/index.js';
import { AppError } from './common/utils/errors/appError.js';
import { globalErrorHandler } from './common/utils/errors/errors.controlers.js';
import morgan from 'morgan';
import { envs } from './config/enviroments/enviroments.js';
import { enableCors } from './config/pluggins/cors.pluggin.js';

const app = express();
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8080',
  'http://localhost:5137',
  'http://localhost:3000',
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// De que servidores voy a aceptar peticiones
enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Me estoy ejecutando en desarrollo');
}

if (envs.NODE_ENV === 'production') {
  console.log('Me estoy ejecutando en producción');
}

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find  ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
