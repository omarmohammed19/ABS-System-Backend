import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface WalletDetailsModel extends Model {
    ID: number;
    walletNumber: string;
    mobileNumber: string;
    isActive: boolean;
}

export const WalletDetails = sequelize.define<WalletDetailsModel>(
    'cust_WalletDetails',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        walletNumber: {
            type: DataTypes.STRING,
        },
        mobileNumber: {
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
