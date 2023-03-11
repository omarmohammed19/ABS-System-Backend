import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface BankNamesModel extends Model {
    ID: number;
    bankName: string;
    isActive: boolean;
}

export const BankNames = sequelize.define<BankNamesModel>(
    'sys_BankNames',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bankName: {
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
