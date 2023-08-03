import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface DisplayedStatusModel extends Model {
    ID: number;
    enDisplayedStatus: string;
    arDisplayedStatus: string;
    Notes: string;
    isActive: boolean;
}

export const displayedStatus = sequelize.define<DisplayedStatusModel>(
    'cust_DisplayedStatus',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enDisplayedStatus: {
            type: DataTypes.STRING,
        },
        arDisplayedStatus: {
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
        tableName: 'cust_DisplayedStatus',
    }
);
