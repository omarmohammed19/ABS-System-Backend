import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PickupTypesModel extends Model {
  ID: number;
  enPickupType: string;
  arPickupType: string;
  Notes: string;
  isActive: boolean;
}

export const PickupTypes = sequelize.define<PickupTypesModel>(
  'ship_PickupTypes',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enPickupType: {
      type: DataTypes.STRING,
    },
    arPickupType: {
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
