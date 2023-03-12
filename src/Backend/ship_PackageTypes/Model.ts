import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PackageTypesModel extends Model {
  ID: number;
  enPackageType: string;
  arPackageType: string;
  Notes: string;
  isActive: boolean;
}

export const PackageTypes = sequelize.define<PackageTypesModel>(
  'ship_PackageTypes',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enPackageType: {
      type: DataTypes.STRING,
    },
    arPackageType: {
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
