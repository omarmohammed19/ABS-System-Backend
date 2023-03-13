import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface SalesChannelsModel extends Model {
  ID: number;
  cmpInfoID: number;
  salesChannelName: string;
  salesChannelURL: string;
  salesChannelTypeID: number;
  isActive: boolean;
}

export const SalesChannels = sequelize.define<SalesChannelsModel>(
  'cust_SalesChannels',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cmpInfoID: {
      type: DataTypes.INTEGER,
    },
    salesChannelName: {
      type: DataTypes.STRING,
    },
    salesChannelURL: {
      type: DataTypes.STRING,
    },
    salesChannelTypeID: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
