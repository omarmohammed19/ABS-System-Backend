import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface StatusModel extends Model {
  ID: number;
  enStatus: string;
  arStatus: string;
  custDisplayedStatusID: string;
  requireReason: boolean;
  Notes: string;
  isActive: boolean;
}

export const Status = sequelize.define<StatusModel>(
  'ship_Status',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enStatus: {
      type: DataTypes.STRING,
    },
    arStatus: {
      type: DataTypes.STRING,
    },
    custDisplayedStatusID: {
      type: DataTypes.STRING,
    },
    requireReason: {
      type: DataTypes.BOOLEAN,
    },
    Notes: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: 'ship_Status',
  }
);
