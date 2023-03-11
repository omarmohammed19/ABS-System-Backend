import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ZonesModel extends Model {
    ID: number;
    zoneName: string;
    zoneTypeID: number;
    isActive: boolean;
}

export const Zones = sequelize.define<ZonesModel>(
    'cmp_Zones',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        zoneName: {
            type: DataTypes.STRING,
        },
        zoneTypeID: {
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
