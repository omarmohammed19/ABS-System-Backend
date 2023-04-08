import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactLogsModel extends Model {
  ID: number;
  AWB: string;
  userID: number;
  contactTypeID: number;
  actionDate: Date;
  smsTemplateID: number;
  phoneNumber: string;
  isActive: boolean;
}

export const ContactLogs = sequelize.define<ContactLogsModel>(
  'ship_ContactLogs',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AWB: {
      type: DataTypes.STRING,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    contactTypeID: {
      type: DataTypes.INTEGER,
    },
    actionDate: {
      type: DataTypes.DATE,
    },
    smsTemplateID: {
      type: DataTypes.INTEGER,
    },
    phoneNumber: {
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
