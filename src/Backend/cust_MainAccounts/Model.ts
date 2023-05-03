import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface MainAccountsModel extends Model {
  ID: number;
  mainAccountName: string;
  accountNumber: string;
  salesmanID: number;
  custInfoID: number;
  cmpInfoID: number;
  clientTypeID: number;
  creationDate: Date;
  isActive: boolean;
}

export const MainAccounts = sequelize.define<MainAccountsModel>(
  'cust_MainAccounts',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mainAccountName: {
      type: DataTypes.STRING,
    },
    accountNumber: {
      type: DataTypes.STRING,
    },
    salesmanID: {
      type: DataTypes.INTEGER,
    },
    custInfoID: {
      type: DataTypes.INTEGER,
    },
    cmpInfoID: {
      type: DataTypes.INTEGER,
    },
    clientTypeID: {
      type: DataTypes.INTEGER,
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
