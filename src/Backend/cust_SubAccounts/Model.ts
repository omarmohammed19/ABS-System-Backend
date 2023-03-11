import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface SubAccountsModel extends Model {
  ID: number;
  mainAccountID: number;
  subAccountName: string;
  accountNumber: string;
  pricePlanID: number;
  paymentMethodID: number;
  productTypeID: number;
  customerServiceID: number;
  prefix: string;
  creationDate: Date;
  isActive: boolean;
}

export const SubAccounts = sequelize.define<SubAccountsModel>(
  'cust_SubAccounts',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mainAccountID: {
      type: DataTypes.INTEGER,
    },
    subAccountName: {
      type: DataTypes.STRING,
    },
    accountNumber: {
      type: DataTypes.STRING,
    },
    pricePlanID: {
      type: DataTypes.INTEGER,
    },
    paymentMethodID: {
      type: DataTypes.INTEGER,
    },
    productTypeID: {
      type: DataTypes.INTEGER,
    },
    customerServiceID: {
      type: DataTypes.INTEGER,
    },
    prefix: {
      type: DataTypes.STRING,
    },
    creationDate: {
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
