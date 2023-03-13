import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PricePlansModel extends Model {
  ID: number;
  pricePlanID: number;
  fromZoneID: number;
  toZoneID: number;
  price: number;
  discount: number;
  extraKilosStart: number;
  extraKilosFees: number;
  priceOnAll: number;
  isActive: boolean;
}

export const PricePlans = sequelize.define<PricePlansModel>(
  'cust_PricePlans',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pricePlanID: {
      type: DataTypes.INTEGER,
    },
    fromZoneID: {
      type: DataTypes.INTEGER,
    },
    toZoneID: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    extraKilosStart: {
      type: DataTypes.INTEGER,
    },
    extraKilosFees: {
      type: DataTypes.FLOAT,
    },
    priceOnAll: {
      type: DataTypes.FLOAT,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
