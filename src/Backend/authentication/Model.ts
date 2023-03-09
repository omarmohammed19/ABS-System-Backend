import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface UsersModel extends Model {
  ID: number;
  username: string;
  password: string;
  subAccountID: string;
  displayedName: string;
  roleID: number;
  avatar: string;
  isActive: boolean;
}

export const Users = sequelize.define<UsersModel>(
  'sys_Users',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    subAccountID: {
      type: DataTypes.INTEGER,
    },
    displayedName: {
      type: DataTypes.STRING,
    },
    roleID: {
      type: DataTypes.INTEGER,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
