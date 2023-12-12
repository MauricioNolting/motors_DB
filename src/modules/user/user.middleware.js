import { AppError } from '../../common/utils/errors/appError.js';
import { catchAsync } from '../../common/utils/errors/catchAsync.js';
import { envs } from '../../config/enviroments/enviroments.js';
import UsersServices from './user.service.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UsersServices.findOne(id);

    if (!user) {
      return next(new AppError(`User id: ${id} not found`, 404));
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};

export const protect = catchAsync(async (req, res, next) => {
  //1. obtener el token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //2. validar que exista el token
  if (!token) {
    return next(
      new AppError('you are not logged in!. PLease login to get access', 401)
    );
  }

  //3. decodificar el token    //Esto es que el verify no devuelve una promesa, pero es nescesaria, entonces se hace el psmisify para que retorne una promesa
  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);
  //4. Buscar el usuario dueno del token y validar si existe
  const user = await UsersServices.findOne(decoded.id);

  if (!user) {
    return next(
      new AppError('The owner of this token is not loger avaible', 401)
    );
  }

  //5. validar si el usuario cambio recienmenten su contrase;a (para que no se use un token viejo)
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User recently changed password, please login again')
      );
    }
  }

  //6.  Adjuntar el usuario en session, el usuario en session es el dueno del token
  req.sessionUser = user; //! importante esto, porque asi se puede usar despues en actualizar algun dato del usuario n session, sacando de la req.sessionUser el usuario actual.
  next();
});

export const protectAcoountOwner = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own whis account', 401));
  }

  next();
};

export const restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You dont have persmission to perfmo this action', 403)
      );
    }
    next();
  };
};
