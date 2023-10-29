import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TransactionHistoryModel extends Model {
  ID: number;
  transID: number;
  shipmentTypeID: number;
  statusID: number;
  runnerID: number;
  auditDate: string;
  reasonID: number;
  userID: number;
  fromBranchID: number;
  toBranchID: number;
  currentBranchID: number;
  isActive: boolean;
}

export const TransactionHistory = sequelize.define<TransactionHistoryModel>(
  'ship_TransactionHistory',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transID: {
      type: DataTypes.INTEGER,
    },
    shipmentTypeID: {
      type: DataTypes.INTEGER,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    runnerID: {
      type: DataTypes.INTEGER,
    },
    auditDate: {
      type: DataTypes.STRING,
    },
    reasonID: {
      type: DataTypes.INTEGER,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    fromBranchID: {
      type: DataTypes.INTEGER,
    },
    toBranchID: {
      type: DataTypes.INTEGER,
    },
    currentBranchID: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'ship_TransactionHistory',
    timestamps: false,
  }
);
