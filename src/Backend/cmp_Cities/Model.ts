import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CitiesModel extends Model {
    ID: number;
    enCityName: string;
    arCityName: string;
    governorateID: number;
    zoneID: number;
    Notes: string;
    isActive: boolean;
}

export const Cities = sequelize.define<CitiesModel>(
    'cmp_Cities',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enCityName: {
            type: DataTypes.STRING,
        },
        arCityName: {
            type: DataTypes.STRING,
        },
        governorateID: {
            type: DataTypes.INTEGER,
        },
        zoneID: {
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
