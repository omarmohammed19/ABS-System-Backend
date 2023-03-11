import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CallStatusModel extends Model {
    ID: number;
    enCallStatus: string;
    arCallStatus: string;
    isActive: boolean;
}

export const CallStatus = sequelize.define<CallStatusModel>(
    'cc_CallStatus',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enCallStatus: {
            type: DataTypes.STRING,
        },
        arCallStatus: {
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
