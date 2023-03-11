import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface VehicleTypesModel extends Model {
    ID: number;
    enVehicleType: string;
    arVehicleType: string;
    Notes: string;
    isActive: boolean;
}

export const VehicleTypes = sequelize.define<VehicleTypesModel>(
    'cmp_VehicleTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enVehicleType: {
            type: DataTypes.STRING,
        },
        arVehicleType: {
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
