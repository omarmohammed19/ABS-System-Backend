import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ShipmentTypesModel extends Model {
  ID: number;
  enShipmentType: string;
  arShipmentType: string;
  Notes: string;
  isActive: boolean;
}

export const ShipmentTypes = sequelize.define<ShipmentTypesModel>(
  'ship_ShipmentTypes',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enShipmentType: {
      type: DataTypes.STRING,
    },
    arShipmentType: {
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
