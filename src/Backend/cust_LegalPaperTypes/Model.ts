import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface LegalPaperTypesModel extends Model {
    ID: number;
    enLegalPaperType: string;
    arLegalPaperType: string;
    Notes: string;
    isActive: boolean;
}

export const LegalPaperTypes = sequelize.define<LegalPaperTypesModel>(
    'cust_LegalPaperTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enLegalPaperType: {
            type: DataTypes.STRING,
        },
        arLegalPaperType: {
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