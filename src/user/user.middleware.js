import UsersServices from './user.service.js';

export const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UsersServices.findOne(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User id: ${id} not found`,
      });
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
