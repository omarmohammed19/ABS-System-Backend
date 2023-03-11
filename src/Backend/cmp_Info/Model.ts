import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface InfoModel extends Model {
    ID: number;
    enCompanyName: string;
    arCompanyName: string;
    isActive: boolean;
}

export const Info = sequelize.define<InfoModel>(
    'cmp_Info',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enCompanyName: {
            type: DataTypes.STRING,
        },
        arCompanyName: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: 'cmp_Info',
    }
);

