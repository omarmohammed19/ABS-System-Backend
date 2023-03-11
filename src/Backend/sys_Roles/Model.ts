import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface RolesModel extends Model {
  ID: number;
  enRole: string;
  arRole: string;
  roleTypeID: number;
  isActive: boolean;
}

export const Roles = sequelize.define<RolesModel>(
  'sys_Roles',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enRole: {
      type: DataTypes.STRING,
    },
    arRole: {
      type: DataTypes.STRING,
    },
    roleTypeID: {
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
