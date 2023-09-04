import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface companyDataModel extends Model {
  ID: number;
  enCompanyName: string;
  arCompanyName: string;
  Website: string;
  Email: string;
  enAddress: string;
  arAddress: string;
  Hotline: string;
  Telephone1: string;
  Telephone2: string;
  Telephone3: string;
  isActive: boolean;
}

export const CompanyData = sequelize.define<companyDataModel>(
  'cmp_CompanyData',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enCompanyName: {
      type: DataTypes.STRING,
    },
    arCompanyName: {
      type: DataTypes.STRING,
    },
    Website: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    enAddress: {
      type: DataTypes.STRING,
    },
    arAddress: {
      type: DataTypes.STRING,
    },
    Hotline: {
      type: DataTypes.STRING,
    },
    Telephone1: {
      type: DataTypes.STRING,
    },
    Telephone2: {
      type: DataTypes.STRING,
    },
    Telephone3: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
