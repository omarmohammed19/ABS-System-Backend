import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactPersonTypesModel extends Model {
    ID: number;
    enContactPersonType: string;
    arContactPersonType: string;
    Notes: string;
    isActive: boolean;
}

export const ContactPersonTypes = sequelize.define<ContactPersonTypesModel>(
    'client_ContactPersonTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enContactPersonType: {
            type: DataTypes.STRING,
        },
        arContactPersonType: {
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