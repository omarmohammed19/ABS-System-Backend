import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CountriesModel extends Model {
    ID: number;
    countryName: string;
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
        countryName: {
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
