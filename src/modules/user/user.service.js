import { Op } from 'sequelize';
import { Users } from './user.model.js';
import Repairs from '../repairs/repairs.model.js';

class UsersServices {
  static async create(data) {
    return await Users.create(data);
  }

  static async findAll() {
    return await Users.findAll({
      where: {
        status: 'avaible',
      },
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'createdAt',
          'updatedAt',
          'status',
        ],
      },
      include: [
        {
          model: Repairs,
        },
      ],
    });
  }

  static async findOne(id) {
    return await Users.findOne({
      where: {
        id: id,
        status: 'avaible',
      },
    });
  }

  static async findOneNameOrEmail(nameOrEmail) {
    return await Users.findOne({
      where: {
        [Op.or]: [{ name: nameOrEmail }, { email: nameOrEmail }],
      },
    });
  }

  static async findOneByEmail(email) {
    return await Users.findOne({
      where: {
        status: 'avaible',
        email,
      },
    });
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({
      status: 'unavaible',
    });
  }
}

export default UsersServices;
