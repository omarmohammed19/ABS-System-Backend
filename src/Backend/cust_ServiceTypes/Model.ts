import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ServiceTypesModel extends Model {
    ID: number;
    enServiceType: string;
    arServiceType: string;
    price: number;
    Notes: string;
    isActive: boolean;
}

export const ServiceTypes = sequelize.define<ServiceTypesModel>(
    'cust_ServiceTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enServiceType: {
            type: DataTypes.STRING,
        },
        arServiceType: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
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
