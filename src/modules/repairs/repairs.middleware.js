import { catchAsync } from '../../common/utils/errors/catchAsync.js';
import RepairsServices from './repairs.services.js';

export const validateRepairs = catchAsync(async (req, res, next) => {
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
});

export const validatePendingRepairs = catchAsync(async (req, res, next) => {
  const findAllRepairs = await RepairsServices.findAllByStatusPending();

  req.repairsPending = findAllRepairs;
  return res.status(200).json({
    findAllRepairs,
  });
  next();
});
