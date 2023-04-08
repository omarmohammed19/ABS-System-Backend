import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TicketStatusModel extends Model {
    ID: number;
    enStatus: string;
    arStatus: string;
    Notes: string;
    isActive: boolean;
}

export const TicketStatus = sequelize.define<TicketStatusModel>(
    'cs_TicketStatus',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enStatus: {
            type: DataTypes.STRING,
        },
        arStatus: {
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
        tableName: "cs_TicketStatus",
    }
);
