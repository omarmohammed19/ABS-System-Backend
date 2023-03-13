import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ExtraInfoModel extends Model {
  ID: number;
  AWB: string;
  Data1: string;
  Data2: string;
  Data3: string;
  Data4: string;
  Data5: string;
  Data6: string;
  Data7: string;
  Data8: string;
  Data9: string;
  Data10: string;

  Notes: string;
  isActive: boolean;
}

export const ExtraInfo = sequelize.define<ExtraInfoModel>(
  'ship_ExtraInfo',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AWB: {
      type: DataTypes.STRING,
    },
    Data1: {
      type: DataTypes.STRING,
    },
    Data2: {
      type: DataTypes.STRING,
    },
    Data3: {
      type: DataTypes.STRING,
    },
    Data4: {
      type: DataTypes.STRING,
    },
    Data5: {
      type: DataTypes.STRING,
    },
    Data6: {
      type: DataTypes.STRING,
    },
    Data7: {
      type: DataTypes.STRING,
    },
    Data8: {
      type: DataTypes.STRING,
    },
    Data9: {
      type: DataTypes.STRING,
    },
    Data10: {
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
    tableName: 'ship_ExtraInfo',
  }
);
