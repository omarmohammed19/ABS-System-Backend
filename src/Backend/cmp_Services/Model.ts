import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CompanyServicesModel extends Model {
  ID: number;
  enService: string;
  arService: string;
  Notes: string;
  isActive: boolean;
}

export const CompanyServices = sequelize.define<CompanyServicesModel>(
  'cmp_Services',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enService: {
      type: DataTypes.STRING,
    },
    arService: {
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
