import { DataTypes } from 'sequelize';
import { sequelize } from '../../Config/database';

export const ContactLogTypes = sequelize.define(
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

export interface ContactLogTypesModel {
  ID?: number;
  enContactLogType: string;
  arContactLogType: string;
  Notes: string;
  isActive?: boolean;
}
