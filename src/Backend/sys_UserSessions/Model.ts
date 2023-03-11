import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface UserSessionsModel extends Model {
    ID: number;
    userID: number;
    loginTime: Date;
    logoutTime: Date;
    isActive: boolean;
}

export const UserSessions = sequelize.define<UserSessionsModel>(
    'sys_UserSessions',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: {
            type: DataTypes.INTEGER,
        },
        loginTime: {
            type: DataTypes.DATE,
        },
        logoutTime: {
            type: DataTypes.DATE,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);
