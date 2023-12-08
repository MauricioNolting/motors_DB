import RepairsServices from './repairs.services.js';

const findAll = async (req, res) => {
  const findAllRepairs = await RepairsServices.findAll();

  return res.status(200).json({
    findAllRepairs,
  });
};

const create = async (req, res) => {
  const { userId, date } = req.body;

  const newRepair = await RepairsServices.create({ date, userId });

  return res.status(201).json({
    data: newRepair,
  });
};

const findOne = async (req, res) => {
  const { id } = req.params;

  const findOne = await RepairsServices.findOne(id);

  if (!findOne) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} not found`,
    });
  }

  return res.status(200).json({
    findOne,
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const status = 'completed';

  const repairsFindOneCompleted = await RepairsServices.findOneCompleted(id);

  if (
    repairsFindOneCompleted &&
    repairsFindOneCompleted.status === 'completed'
  ) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} status: "completed"`,
    });
  }

  const findOne = await RepairsServices.findOne(id);
  if (!findOne) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} not found`,
    });
  }

  const repairsUpdate = await RepairsServices.update(repairsFindOneCompleted, {
    status,
  });

  return res.status(200).json({
    message: 'method update(patch)',
    repairsUpdate,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const repairsFindCompleted = await RepairsServices.findOneCompleted(id);
  if (repairsFindCompleted) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} already completed`,
    });
  }

  const repairsFindOne = await RepairsServices.findOne(id);

  if (!repairsFindOne) {
    return res.status(404).json({
      status: 'error',
      message: `User id: ${id} not found`,
    });
  }

  await RepairsServices.delete(repairsFindOne);

  return res.status(204).json(null);
};

export default {
  findAll,
  create,
  findOne,
  update,
  deleteUser,
};
