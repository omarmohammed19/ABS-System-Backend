import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface NearestBranchModel extends Model {
    ID: number;
    branchID: number;
    isActive: boolean;
}

export const NearestBranch = sequelize.define<NearestBranchModel>(
    'cust_NearestBranch',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        branchID: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: 'cust_NearestBranch',
    }
);
