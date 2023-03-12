import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactPersonsModel extends Model {
    ID: number;
    subAccountID: number;
    firstName: string;
    lastName: string;
    contactPersonTypeID: number;
    addressID: number;
    isActive: boolean;
}

export const ContactPersons = sequelize.define<ContactPersonsModel>(
    'cust_ContactPersons',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subAccountID: {
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        contactPersonTypeID: {
            type: DataTypes.INTEGER,
        },
        addressID: {
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