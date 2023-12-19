import Repairs from '../../modules/repairs/repairs.model.js';
import { Users } from '../../modules/user/user.model.js';

export const initModel = () => {
  Users.hasMany(Repairs, { foreignKey: 'userId' });
  Repairs.belongsTo(Users, { foreignKey: 'userId' });
};
