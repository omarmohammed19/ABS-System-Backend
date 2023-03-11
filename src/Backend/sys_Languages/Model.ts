import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface LanguagesModel extends Model {
    ID: number;
    Language: string;
    isActive: boolean;
}

export const Languages = sequelize.define<LanguagesModel>(
    'sys_Languages',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Language: {
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
