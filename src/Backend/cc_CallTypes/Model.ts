import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CallTypesModel extends Model {
    ID: number;
    enCallType: string;
    arCallType: string;
    Notes: string;
    isActive: boolean;
}

export const CallTypes = sequelize.define<CallTypesModel>(
    'cc_CallTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enCallType: {
            type: DataTypes.STRING,
        },
        arCallType: {
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
