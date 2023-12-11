import { AppError } from '../../common/utils/errors/appError.js';
import { catchAsync } from '../../common/utils/errors/catchAsync.js';
import { validatePartialUser, validateUser } from './user.schema.js';
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

  return res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
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

export default {
  findAll,
  create,
  findOne,
  update,
  deleteUser,
};
