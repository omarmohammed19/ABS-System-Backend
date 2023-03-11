import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ZoneTypesModel extends Model {
    ID: number;
    zoneType: string;
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
        zoneType: {
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