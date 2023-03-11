import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface SalesChannelTypesModel extends Model {
    ID: number;
    enSalesChannelType: string;
    arSalesChannelType: string;
    Notes: string;
    isActive: boolean;
}

export const SalesChannelTypes = sequelize.define<SalesChannelTypesModel>(
    'cust_SalesChannelTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enSalesChannelType: {
            type: DataTypes.STRING,
        },
        arSalesChannelType: {
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
