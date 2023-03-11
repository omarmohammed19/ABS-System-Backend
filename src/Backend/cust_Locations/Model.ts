import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface LocationsModel extends Model {
    ID: number;
    locationName: string;
    addressID: number;
    isActive: boolean;
}

export const Locations = sequelize.define<LocationsModel>(
    'cust_Locations',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        locationName: {
            type: DataTypes.STRING,
        },
        addressID: {
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
