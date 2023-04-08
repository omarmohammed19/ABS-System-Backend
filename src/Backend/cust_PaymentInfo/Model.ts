import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PaymentInfoModel extends Model {
  ID: number;
  subAccountID: number;
  mobileCashID: number;
  walletDetailsID: number;
  nearestBranchID: number;
  bankDetailsID: number;
  isActive: boolean;
}

export const PaymentInfo = sequelize.define<PaymentInfoModel>(
  'cust_PaymentInfo',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subAccountID: {
      type: DataTypes.INTEGER,
    },
    mobileCashID: {
      type: DataTypes.INTEGER,
    },
    walletDetailsID: {
      type: DataTypes.INTEGER,
    },
    nearestBranchID: {
      type: DataTypes.INTEGER,
    },
    bankDetailsID: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: 'cust_PaymentInfo',
  }
);
