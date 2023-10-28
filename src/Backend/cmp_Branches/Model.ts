import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface BranchesModel extends Model {
    ID: number;
    enBranchName: string;
    arBranchName: string;
    cityID: number;
    address: string;
    location: string;
    isActive: boolean;
}

export const Branches = sequelize.define<BranchesModel>(
    'cmp_Branches',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enBranchName: {
            type: DataTypes.STRING,
        },
        arBranchName: {
            type: DataTypes.STRING,
        },
        cityID: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING,
        },
        location: {
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

