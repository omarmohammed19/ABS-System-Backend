import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ServicesModel extends Model {
  ID: number;
  enService: string;
  arService: string;
  Notes: string;
  isActive: boolean;
}

export const Services = sequelize.define<ServicesModel>(
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
