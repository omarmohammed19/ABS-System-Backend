import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface GendersModel extends Model {
    ID: number;
    enGender: string;
    arGender: string;
    isActive: boolean;
}

export const Genders = sequelize.define<GendersModel>(
    'sys_Genders',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enGender: {
            type: DataTypes.STRING,
        },
        arGender: {
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
