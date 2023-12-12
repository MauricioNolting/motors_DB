import { AppError } from '../../common/utils/errors/appError.js';
import { catchAsync } from '../../common/utils/errors/catchAsync.js';
import {
  encryptedPassword,
  verifyPassword,
} from '../../config/pluggins/encripted-password.pluggin.js';
import { generateJWT } from '../../config/pluggins/generate-jwt.plugin.js';
import {
  validateLogin,
  validatePartialUser,
  validateUser,
} from './user.schema.js';
import UsersServices from './user.service.js';

const findAll = catchAsync(async (req, res, next) => {
  const findAllUsers = await UsersServices.findAll();

  return res.status(200).json({
    findAllUsers,
  });
});

const create = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const existUserName = await UsersServices.findOneNameOrEmail(userData.name);
  if (existUserName) {
    return res.status(409).json({
      status: 'error',
      message: `The name: ${userData.name} already exists`,
    });
  }

  const existUserEmail = await UsersServices.findOneNameOrEmail(userData.email);
  if (existUserEmail) {
    return res.status(409).json({
      status: 'error',
      message: `The email: ${userData.email} already exists`,
    });
  }

  const newUser = await UsersServices.create(userData);

  //generar el jwt
  const token = await generateJWT(newUser.id);

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  // 1er paso: traer los datos de la req.boy y validarlos
  const { hasError, errorMessages, userData } = validateLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  // 2do paso: validar que el usuario exista en la base de datos
  const user = await UsersServices.findOneByEmail(userData.email);

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }
  // 3er paso, comparar y comprobar constrenas
  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password'));
  }

  // 4to paso:, generar el jwt
  const token = await generateJWT(user.id);

  // 5. enviar respuesta al cliente
  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json(user);
});

const update = catchAsync(async (req, res) => {
  const { user } = req;

  const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userUpdate = await UsersServices.update(user, userData);

  return res.status(200).json({
    message: 'method update(patch)',
    userUpdate,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await UsersServices.delete(user);

  return res.status(204).json(null);
});

const changePassword = catchAsync(async (req, res, next) => {
  //1. Obtener el usuario en session
  const { sessionUser } = req;

  //2. traer los dats de la req.body
  const { currentPassword, newPassword } = req.body;

  //3 Validar si la constrase;a acutal es igual a la nueva

  if (currentPassword === newPassword) {
    return next(new AppError('The passwords cannot be equal', 400));
  }

  //4 validar si la contrase;a actual es igual a la de base de datos
  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //5. encripar la nueva contrase;a
  const hashedNewPassword = await encryptedPassword(newPassword);

  //6. actualizar la contrase;a
  await UsersServices.update(sessionUser, {
    password: hashedNewPassword,
    passwordChangedAt: new Date(),
  });

  return res.status(200).json({
    message: 'The user password was updated succesfully',
  });
});

export default {
  findAll,
  create,
  findOne,
  update,
  deleteUser,
  login,
  changePassword,
};
