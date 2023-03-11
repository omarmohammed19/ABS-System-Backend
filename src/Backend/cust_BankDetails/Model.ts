import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface BankDetailsModel extends Model {
    ID: number;
    accountHolderName: string;
    accountNumber: string;
    bankNameID: number;
    IBAN: string;
    swiftCode: string;
    isActive: boolean;
}

export const BankDetails = sequelize.define<BankDetailsModel>(
    'cust_BankDetails',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        accountHolderName: {
            type: DataTypes.STRING,
        },
        accountNumber: {
            type: DataTypes.STRING,
        },
        bankNameID: {
            type: DataTypes.INTEGER,
        },
        IBAN: {
            type: DataTypes.STRING,
        },
        swiftCode: {
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
