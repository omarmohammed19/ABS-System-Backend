import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface MobileCashModel extends Model {
    ID: number;
    mobileNumber: string;
    isActive: boolean;
}

export const MobileCash = sequelize.define<MobileCashModel>(
    'cust_MobileCash',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        tableName: 'cust_MobileCash',
    }
);
