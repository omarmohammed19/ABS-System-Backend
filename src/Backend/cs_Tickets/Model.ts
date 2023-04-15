import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TicketsModel extends Model {
    ID: number;
    AWB: string;
    ticketTypeID: number;
    ticketStatusID: number;
    Description: string;
    creationDate: Date;
    lastActionDate: Date;
    isClosed: boolean;
    userID: number;
    documentPath: string;
    isActive: boolean;
}

export const Tickets = sequelize.define<TicketsModel>(
    'cs_Tickets',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        AWB: {
            type: DataTypes.STRING,
        },
        ticketTypeID: {
            type: DataTypes.INTEGER,
        },
        ticketStatusID: {
            type: DataTypes.INTEGER,
        },
        Description: {
            type: DataTypes.STRING,
        },
        creationDate: {
            type: DataTypes.DATE,
        },
        lastActionDate: {
            type: DataTypes.DATE,
        },
        isClosed: {
            type: DataTypes.BOOLEAN,
        },
        userID: {
            type: DataTypes.INTEGER,
        },
        documentPath: {
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
