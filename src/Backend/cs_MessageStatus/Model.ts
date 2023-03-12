import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface MessageStatusModel extends Model {
    ID: number;
    enMessageStatusType: string;
    arMessageStatusType: string;
    Notes: string;
    isActive: boolean;
}

export const MessageStatus = sequelize.define<MessageStatusModel>(
    'cs_MessageStatus',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enMessageStatusType: {
            type: DataTypes.STRING,
        },
        arMessageStatusType: {
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
        tableName: "cs_MessageStatus"
    }
);
