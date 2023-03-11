import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TicketActionsModel extends Model {
    ID: number;
    ticketID: number;
    ticketStatusID: number;
    userID: number;
    actionDate: Date;
    Notes: string;
    isActive: boolean;
}

export const TicketActions = sequelize.define<TicketActionsModel>(
    'cs_TicketActions',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ticketID: {
            type: DataTypes.INTEGER,
        },
        ticketStatusID: {
            type: DataTypes.INTEGER,
        },
        userID: {
            type: DataTypes.INTEGER,
        },
        actionDate: {
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
    }
);
