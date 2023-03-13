import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface ServicesModel extends Model {
    ID: number;
    subAccountID: number;
    serviceTypeID: number;
    isActive: boolean;
}

export const Services = sequelize.define<ServicesModel>(
    'cust_Services',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subAccountID: {
            type: DataTypes.INTEGER,
        },
        serviceTypeID: {
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
