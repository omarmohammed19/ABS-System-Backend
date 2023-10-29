import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TransactionHdrModel extends Model {
  ID: number;
  mainAccountID: number;
  subAccountID: number;
  userID: number;
  serviceID: number;
  creationDate: string;
  noOfAWBs: number;
  BranchID: number;
  isActive: boolean;
}

export const TransactionHdr = sequelize.define<TransactionHdrModel>(
  'ship_TransactionHdr',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mainAccountID: {
      type: DataTypes.INTEGER,
    },
    subAccountID: {
      type: DataTypes.INTEGER,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    serviceID: {
      type: DataTypes.INTEGER,
    },
    creationDate: {
      type: DataTypes.STRING,
    },
    noOfAWBs: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'ship_TransactionHdr',
    timestamps: false,
  }
);
