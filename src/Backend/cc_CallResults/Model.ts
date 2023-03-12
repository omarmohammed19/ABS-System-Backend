import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CallResultsModel extends Model {
    ID: number;
    enCallResult: string;
    arCallResult: string;
    Notes: string;
    isActive: boolean;
}

export const CallResults = sequelize.define<CallResultsModel>(
    'cc_CallResults',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enCallResult: {
            type: DataTypes.STRING,
        },
        arCallResult: {
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
