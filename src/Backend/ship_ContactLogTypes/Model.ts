import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactLogTypesModel extends Model {
  ID: number;
  enContactLogType: string;
  arContactLogType: string;
  Notes: string;
  isActive: boolean;
}

export const ContactLogTypes = sequelize.define<ContactLogTypesModel>(
  'ship_ContactLogTypes',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enContactLogType: {
      type: DataTypes.STRING,
    },
    arContactLogType: {
      type: DataTypes.STRING,
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
  }
);
