import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TemplateTypesModel extends Model {
    ID: number;
    enTemplateType: string;
    arTemplateType: string;
    Notes: string;
    isActive: boolean;
}

export const TemplateTypes = sequelize.define<TemplateTypesModel>(
    'cs_TemplateTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enTemplateType: {
            type: DataTypes.STRING,
        },
        arTemplateType: {
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
