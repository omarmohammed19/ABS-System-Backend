import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface UsersRolesModel extends Model {
  ID: number;
  userID: number;
  roleID: number;
  isActive: boolean;
}

export const UserRoles = sequelize.define<UsersRolesModel>(
  'sys_UserRoles',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    roleID: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
