import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface NumberTypesModel extends Model {
    ID: number;
    enNumberType: string;
    arNumberType: string;
    Notes: string;
    isActive: boolean;
}

export const NumberTypes = sequelize.define<NumberTypesModel>(
    'client_NumberTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enNumberType: {
            type: DataTypes.STRING,
        },
        arNumberType: {
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