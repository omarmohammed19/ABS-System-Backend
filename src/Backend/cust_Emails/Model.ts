import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface EmailsModel extends Model {
    ID: number;
    custInfoID: number;
    cmpInfoID: number;
    email: string;
    emailTypeID: number;
    contactPersonID: number;
    isActive: boolean;
}

export const Emails = sequelize.define<EmailsModel>(
    'cust_Emails',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        custInfoID: {
            type: DataTypes.INTEGER,
        },
        cmpInfoID: {
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
        },
        emailTypeID: {
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