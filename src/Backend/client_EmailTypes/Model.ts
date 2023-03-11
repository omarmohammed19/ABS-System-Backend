import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface EmailTypesModel extends Model {
    ID: number;
    enEmailType: string;
    arEmailType: string;
    Notes: string;
    isActive: boolean;
}

export const EmailTypes = sequelize.define<EmailTypesModel>(
    'client_EmailTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enEmailType: {
            type: DataTypes.STRING,
        },
        arEmailType: {
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