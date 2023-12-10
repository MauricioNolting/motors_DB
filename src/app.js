import express from 'express';
import router from './routes/index.js';
import { AppError } from './common/utils/errors/appError.js';
import { globalErrorHandler } from './common/utils/errors/errors.controlers.js';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find  ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
