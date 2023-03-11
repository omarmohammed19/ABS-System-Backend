import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface InfoModel extends Model {
    ID: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
}

export const Info = sequelize.define<InfoModel>(
    'cust_Info',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
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