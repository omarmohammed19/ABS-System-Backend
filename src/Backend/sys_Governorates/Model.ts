import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface GovernoratesModel extends Model {
    ID: number;
    governorateName: string;
    countryID: number;
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
        governorateName: {
            type: DataTypes.STRING,
        },
        countryID: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);
