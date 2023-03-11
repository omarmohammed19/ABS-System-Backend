import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactNumbersModel extends Model {
    ID: number;
    contactNumber: string;
    cneeContactPersonID: number;
    numberTypeID: number;
    isActive: boolean;
}

export const ContactNumbers = sequelize.define<ContactNumbersModel>(
    'cnee_ContactNumbers',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contactNumber: {
            type: DataTypes.STRING,
        },
        cneeContactPersonID: {
            type: DataTypes.INTEGER,
        },
        numberTypeID: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);