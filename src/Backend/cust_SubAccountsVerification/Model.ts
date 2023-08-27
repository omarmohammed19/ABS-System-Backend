import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface SubAccountsVerificationModel extends Model {
    ID: number;
    subAccountID: number;
    verificationTypeID: number;
    isVerified: boolean;
    isActive: boolean;
}

export const SubAccountsVerification = sequelize.define<SubAccountsVerificationModel>(
    'cust_SubAccountsVerification',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subAccountID: {
            type: DataTypes.INTEGER,
        },
        verificationTypeID: {
            type: DataTypes.INTEGER,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: 'cust_SubAccountsVerification',
    }
);
