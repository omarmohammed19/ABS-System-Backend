import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface EmailsModel extends Model {
    ID: number;
    emailTypeID: number;
    contactPersonID: number;
    email: string;
    isActive: boolean;
}

export const Emails = sequelize.define<EmailsModel>(
    'cnee_Emails',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emailTypeID: {
            type: DataTypes.INTEGER,
        },
        contactPersonID: {
            type: DataTypes.INTEGER,
        },
        email: {
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