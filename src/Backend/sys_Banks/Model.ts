import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface BanksModel extends Model {
    ID: number;
    enBankName: string;
    arBankName: string;
    Notes: string;
    isActive: boolean;
}

export const Banks = sequelize.define<BanksModel>(
    'sys_Banks',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enBankName: {
            type: DataTypes.STRING,
        },
        arBankName: {
            type: DataTypes.STRING,
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
