import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PrevStatusModel extends Model {
  ID: number;
  statusID: number;
  prevStatusID: number;
  isActive: boolean;
}

export const PrevStatus = sequelize.define<PrevStatusModel>(
  'ship_prevStatus',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    prevStatusID: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: 'ship_prevStatus',
  }
);
