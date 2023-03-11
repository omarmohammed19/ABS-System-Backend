import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactNumbersModel extends Model {
    ID: number;
    subAccountID: number;
    contactNumber: string;
    contactTypeID: number;
    numberTypeID: number;
    contactPersonID: number;
    isActive: boolean;
}

export const ContactNumbers = sequelize.define<ContactNumbersModel>(
    'cust_ContactNumbers',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subAccountID: {
            type: DataTypes.INTEGER,
        },
        contactNumber: {
            type: DataTypes.STRING,
        },
        contactTypeID: {
            type: DataTypes.INTEGER,
        },
        numberTypeID: {
            type: DataTypes.INTEGER,
        },
        contactPersonID: {
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