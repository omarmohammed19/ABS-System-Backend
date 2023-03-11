import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TicketTypesModel extends Model {
    ID: number;
    enTicketType: string;
    arTicketType: string;
    Notes: string;
    isActive: boolean;
}

export const TicketTypes = sequelize.define<TicketTypesModel>(
    'cs_TicketTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enTicketType: {
            type: DataTypes.STRING,
        },
        arTicketType: {
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
