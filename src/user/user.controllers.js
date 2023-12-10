import { validatePartialUser, validateUser } from './user.schema.js';
import UsersServices from './user.service.js';

const findAll = async (req, res) => {
  try {
    const findAllUsers = await UsersServices.findAll();

    return res.status(200).json({
      findAllUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: error,
    });
  }
};

const create = async (req, res) => {
  try {
    const { hasError, errorMessages, userData } = validateUser(req.body);
    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }
    console.log(userData.name);

    // const { name, email, password, role } = req.body;

    const existUserName = await UsersServices.findOneNameOrEmail(userData.name);
    if (existUserName) {
      return res.status(409).json({
        status: 'error',
        message: `The name: ${userData.name} already exists`,
      });
    }

    const existUserEmail = await UsersServices.findOneNameOrEmail(
      userData.email
    );
    if (existUserEmail) {
      return res.status(409).json({
        status: 'error',
        message: `The email: ${userData.email} already exists`,
      });
    }

    const newUser = await UsersServices.create(userData);

    return res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const { user } = req;

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};

const update = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await UsersServices.delete(user);

    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: error,
    });
  }
};

export default {
  findAll,
  create,
  findOne,
  update,
  deleteUser,
};
