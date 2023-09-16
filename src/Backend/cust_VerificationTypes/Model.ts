import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface VerificationTypesModel extends Model {
    ID: number;
    enVerificationType: string;
    arVerificationType: string;
    Notes: string;
    isActive: boolean;
}

export const VerificationTypes = sequelize.define<VerificationTypesModel>(
    'cust_VerificationTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enVerificationType: {
            type: DataTypes.STRING,
        },
        arVerificationType: {
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
