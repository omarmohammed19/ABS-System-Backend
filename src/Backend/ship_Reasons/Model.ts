import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ReasonsModel extends Model {
  ID: number;
  enReason: string;
  arReason: string;
  Notes: string;
  isActive: boolean;
}

export const Reasons = sequelize.define<ReasonsModel>(
  'ship_Reasons',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enReason: {
      type: DataTypes.STRING,
    },
    arReason: {
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
    tableName: 'ship_Reasons',
  }
);
