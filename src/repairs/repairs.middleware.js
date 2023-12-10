import RepairsServices from './repairs.services.js';

export const validateRepairs = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await RepairsServices.findOne(id);

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `User id: ${id} not found`,
      });
    }

    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};
