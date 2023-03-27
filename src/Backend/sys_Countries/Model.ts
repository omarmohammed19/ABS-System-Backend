import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CountriesModel extends Model {
    ID: number;
    enCountryName: string;
    arCountryName: string;
    Notes: string;
    isActive: boolean;
}

export const Countries = sequelize.define<CountriesModel>(
    'sys_Countries',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enCountryName: {
            type: DataTypes.STRING,
        },
        arCountryName: {
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
