import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ProductsModel extends Model {
  ID: number;
  enProduct: string;
  arProduct: string;
  requireIDNO: boolean;
  Notes: string;
  isActive: boolean;
}

export const Products = sequelize.define<ProductsModel>(
  'ship_Products',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enProduct: {
      type: DataTypes.STRING,
    },
    arProduct: {
      type: DataTypes.STRING,
    },
    requireIDNO: {
      type: DataTypes.BOOLEAN,
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
