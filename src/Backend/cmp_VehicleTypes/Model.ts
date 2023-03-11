import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface VehicleTypesModel extends Model {
    ID: number;
    enVehicleTypeName: string;
    arVehicleTypeName: string;
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
        enVehicleTypeName: {
            type: DataTypes.STRING,
        },
        arVehicleTypeName: {
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
