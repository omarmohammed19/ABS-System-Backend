import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface CallHistoryModel extends Model {
    ID: number;
    AWB: string;
    callTypeID: number;
    callStatusID: number;
    callResultID: number;
    assignedBy: string;
    assignedTo: string;
    assignedAt: Date;
    callDate: Date;
    Notes: string;
    isActive: boolean;
}

export const CallHistory = sequelize.define<CallHistoryModel>(
    'cc_CallHistory',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        AWB: {
            type: DataTypes.STRING,
        },
        callTypeID: {
            type: DataTypes.INTEGER,
        },
        callStatusID: {
            type: DataTypes.INTEGER,
        },
        callResultID: {
            type: DataTypes.INTEGER,
        },
        assignedBy: {
            type: DataTypes.STRING,
        },
        assignedTo: {
            type: DataTypes.STRING,
        },
        assignedAt: {
            type: DataTypes.DATE,
        },
        callDate: {
            type: DataTypes.DATE,
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
        tableName: 'cc_CallHistory',
    }
);
