import { catchAsync } from '../../common/utils/errors/catchAsync.js';
import UsersServices from '../user/user.service.js';
import { validatePartialRepair, validateRepair } from './repairs.schema.js';
import RepairsServices from './repairs.services.js';

const findAll = catchAsync(async (req, res, next) => {
  const findAllRepairs = await RepairsServices.findAll();

  return res.status(200).json({
    findAllRepairs,
  });
});

const create = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, repairData } = validateRepair(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  // const findUserId = await UsersServices.findOne(repairData.userId);
  // if (!findUserId) {
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'User id dont exist',
  //   });
  // }
  const newRepair = await RepairsServices.create(repairData);

  return res.status(201).json({
    data: newRepair,
  });
});

const findOne = async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    repair,
  });
};

const repairUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const status = 'completed';

  const { hasError, errorMessages, repairData } = validatePartialRepair(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const repairsFindOne = await RepairsServices.findOne(id);

  if (repairsFindOne && repairsFindOne.status === 'completed') {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} status is already "completed"`,
    });
  }

  if (!repairsFindOne) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} with status: "pending" dont exist`,
    });
  }

  const findOne = await RepairsServices.findOne(id);
  if (!findOne) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} not found`,
    });
  }

  const repairsUpdate = await RepairsServices.update(repairsFindOne, {
    repairData,
    status,
  });

  return res.status(200).json({
    message: 'method update(patch)',
    repairsUpdate,
  });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { repair } = req;

  const repairsFindCompleted = await RepairsServices.findOneCompleted(id);
  if (repairsFindCompleted) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} already completed`,
    });
  }

  await RepairsServices.delete(repair);

  return res.status(204).json(null);
});

export default {
  findAll,
  create,
  findOne,
  repairUpdate,
  deleteRepair,
};
