import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface RecipientTypesModel extends Model {
  ID: number;
  enRecipientType: string;
  arRecipientType: string;
  Notes: string;
  isActive: boolean;
}

export const RecipientTypes = sequelize.define<RecipientTypesModel>(
  'ship_RecipientTypes',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enRecipientType: {
      type: DataTypes.STRING,
    },
    arRecipientType: {
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
