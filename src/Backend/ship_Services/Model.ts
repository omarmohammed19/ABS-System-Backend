import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ShipmentServicesModel extends Model {
  ID: number;
  AWB: string;
  serviceID: number;
  isActive: boolean;
}

export const ShipmentServices = sequelize.define<ShipmentServicesModel>(
  'ship_Services',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AWB: {
      type: DataTypes.STRING,
    },
    serviceID: {
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
