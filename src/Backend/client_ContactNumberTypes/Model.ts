import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactNumberTypesModel extends Model {
    ID: number;
    enContactNumberType: string;
    arContactNumberType: string;
    Notes: string;
    isActive: boolean;
}

export const ContactNumberTypes = sequelize.define<ContactNumberTypesModel>(
    'client_ContactNumberTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enContactNumberType: {
            type: DataTypes.STRING,
        },
        arContactNumberType: {
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