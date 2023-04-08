import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PickupHistoryModel extends Model {
  ID: number;
  pickupID: number;
  statusID: number;
  actionTime: Date;
  userID: number;
  runnerID: number;
  reasonID: number;
  isActive: boolean;
}

export const PickupHistory = sequelize.define<PickupHistoryModel>(
  'ship_PickupHistory',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pickupID: {
      type: DataTypes.INTEGER,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    actionTime: {
      type: DataTypes.DATE,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    runnerID: {
      type: DataTypes.INTEGER,
    },
    reasonID: {
      type: DataTypes.INTEGER,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'ship_PickupHistory',
    timestamps: false,
  }
);
