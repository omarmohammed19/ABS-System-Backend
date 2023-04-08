import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface GovernoratesModel extends Model {
    ID: number;
    enGovernorateName: string;
    arGovernorateName: string;
    countryID: number;
    Notes: string;
    isActive: boolean;
}

export const Governorates = sequelize.define<GovernoratesModel>(
    'sys_Governorates',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enGovernorateName: {
            type: DataTypes.STRING,
        },
        arGovernorateName: {
            type: DataTypes.STRING,
        },
        countryID: {
            type: DataTypes.INTEGER,
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
