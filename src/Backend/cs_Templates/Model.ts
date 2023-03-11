import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TemplatesModel extends Model {
    ID: number;
    enMessage: string;
    arMessage: string;
    templateTypeID: number;
    isActive: boolean;
}

export const Templates = sequelize.define<TemplatesModel>(
    'cs_Templates',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enMessage: {
            type: DataTypes.STRING,
        },
        arMessage: {
            type: DataTypes.STRING,
        },
        templateTypeID: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);
