import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface MailModel extends Model {
    ID: number;
    email: string;
    OTP: string;
    isActive: boolean;
}

export const Mail = sequelize.define<MailModel>(
    'cust_OTP',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        OTP: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: 'cust_OTP',
    }
);
