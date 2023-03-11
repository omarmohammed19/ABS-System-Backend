import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface RoleTypeModel extends Model {
    ID: number;
    enRoleType: string;
    arRoleType: string;
    Notes: string;
    isActive: boolean;
}

export const RoleType = sequelize.define<RoleTypeModel>(
    'sys_RoleType',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enRoleType: {
            type: DataTypes.STRING,
        },
        arRoleType: {
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