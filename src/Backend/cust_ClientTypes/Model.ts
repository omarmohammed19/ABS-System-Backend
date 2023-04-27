import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ClientTypesModel extends Model {
    ID: number;
    enClientType: string;
    arClientType: string;
    Notes: string;
    isActive: boolean;
}

export const ClientTypes = sequelize.define<ClientTypesModel>(
    'cust_ClientTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enClientType: {
            type: DataTypes.STRING,
        },
        arClientType: {
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