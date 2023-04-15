import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ContactPersonsModel extends Model {
    ID: number;
    subAccountID: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
}


export const ContactPersons = sequelize.define<ContactPersonsModel>(
    'cnee_ContactPersons',
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
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);