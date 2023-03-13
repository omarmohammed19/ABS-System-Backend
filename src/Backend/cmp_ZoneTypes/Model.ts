import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ZoneTypesModel extends Model {
    ID: number;
    enZoneType: string;
    arZoneType: string;
    Notes: string;
    isActive: boolean;
}

export const ZoneTypes = sequelize.define<ZoneTypesModel>(
    'cmp_ZoneTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enZoneType: {
            type: DataTypes.STRING,
        },
        arZoneType: {
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