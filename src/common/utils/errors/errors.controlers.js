import { envs } from '../../../config/enviroments/enviroments.js';
import { AppError } from './appError.js';
import { Error } from './error.Model.js';

const handleJWTError = () => {
  return new AppError('JWT is incorrect, please login again', 401);
};

const handleJWTExpired = () => {
  return new AppError('JWT was expired!', 401);
};

const handleCastError23505 = () => {
  return new AppError('Duplicate field value: write other value', 409);
};

const handleCastError22P02 = () => {
  return new AppError('invalid data type in database', 400);
};

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.isOperational) {
    //operational error: send message to client
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //programming or ohter unknow error: dont send error detail
    console.log('ERROR: ', err);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (envs.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (envs.NODE_ENV === 'production') {
    let error = err;
    if (err.parent?.code === '23505') error = handleCastError23505();

    if (err.parent?.code === '22P02') error = handleCastError22P02();

    if (err.name === 'TokenExpiredError') error = handleJWTExpired();

    if (err.name === 'JsonWebTokenError') error = handleJWTError();

    sendErrorProd(error, res);
  }
};
