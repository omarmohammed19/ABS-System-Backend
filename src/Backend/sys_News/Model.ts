import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface NewsModel extends Model {
    ID: number;
    enNews: string;
    arNews: string;
    isActive: boolean;
}

export const News = sequelize.define<NewsModel>(
    'sys_News',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enNews: {
            type: DataTypes.STRING,
        },
        arNews: {
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