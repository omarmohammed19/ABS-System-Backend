import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TitlesModel extends Model {
    ID: number;
    enTitleName: string;
    arTitleName: string;
    isActive: boolean;
}

export const Titles = sequelize.define<TitlesModel>(
    'cmp_Titles',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enTitleName: {
            type: DataTypes.STRING,
        },
        arTitleName: {
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