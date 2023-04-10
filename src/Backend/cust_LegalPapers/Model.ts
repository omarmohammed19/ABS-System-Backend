import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface LegalPapersModel extends Model {
  ID: number;
  mainAccountID: number;
  legalPaperTypeID: number;
  legalPaperImage: string;
  isActive: boolean;
}

export const LegalPapers = sequelize.define<LegalPapersModel>(
  'cust_LegalPapers',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mainAccountID: {
      type: DataTypes.INTEGER,
    },
    legalPaperTypeID: {
      type: DataTypes.INTEGER,
    },
    legalPaperImage: {
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
