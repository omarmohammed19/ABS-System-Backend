import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface SMSModel extends Model {
    ID: number;
    AWB: string;
    userID: number;
    Message: string;
    messageStatusID: number;
    messageRecieverNumber: number;
    actionDate: Date;
    Notes: string;
    isActive: boolean;
}

export const SMS = sequelize.define<SMSModel>(
    'cs_SMS',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        AWB: {
            type: DataTypes.STRING,
        },
        userID: {
            type: DataTypes.INTEGER,
        },
        Message: {
            type: DataTypes.STRING,
        },
        messageStatusID: {
            type: DataTypes.INTEGER,
        },
        messageRecieverNumber: {
            type: DataTypes.INTEGER,
        },
        actionDate: {
            type: DataTypes.DATE,
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
