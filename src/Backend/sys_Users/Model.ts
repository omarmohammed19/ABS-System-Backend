import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';
import { SubAccounts } from '../cust_SubAccounts/Model';
import { Roles } from '../sys_Roles/Model';

export interface UsersModel extends Model {
  [x: string]: any;
  ID: number;
  username: string;
  password: string;
  subAccountID: number;
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
      references: {
        model: 'SubAccounts',
        key: 'ID',
      },
    },
    displayedName: {
      type: DataTypes.STRING,
    },
    roleID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'ID',
      },
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

// SubAccounts.hasMany(Users, { foreignKey: 'subAccountID' });
Users.belongsTo(SubAccounts, { foreignKey: 'subAccountID' });
// Roles.hasMany(Users, { foreignKey: 'roleID' });
Users.belongsTo(Roles, { foreignKey: 'roleID' });
