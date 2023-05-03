import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ZonesModel extends Model {
    ID: number;
    subAccountID: number;
    cityID: number;
    zoneID: number;
    isActive: boolean;
}

export const Zones = sequelize.define<ZonesModel>(
    'cust_Zones',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subAccountID: {
            type: DataTypes.INTEGER,
        },
        cityID: {
            type: DataTypes.INTEGER,
        },
        zoneID: {
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
