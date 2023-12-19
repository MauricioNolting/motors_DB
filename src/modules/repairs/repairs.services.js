import { Users } from '../user/user.model.js';
import Repairs from './repairs.model.js';

class RepairsServices {
  static async create(data) {
    return await Repairs.create(data);
  }

  static async findAll() {
    return await Repairs.findAll({
      where: {
        status: ['pending', 'completed'],
      },
      include: [
        {
          model: Users,
          attributes: ['name', 'email', 'status'],
        },
      ],
    });
  }

  static async findOne(id) {
    return await Repairs.findOne({
      where: {
        id: id,
        status: 'pending',
      },
      include: [
        {
          model: Users,
          attributes: {
            exclude: [
              'password',
              'passwordChangedAt',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
  }

  static async findOneCompleted(id) {
    return await Repairs.findOne({
      where: {
        id: id,
        status: 'completed',
      },
    });
  }

  static async update(repair, data) {
    return await repair.update(data);
  }

  static async delete(repair) {
    return await repair.update({
      status: 'cancelled',
    });
  }
}

export default RepairsServices;
