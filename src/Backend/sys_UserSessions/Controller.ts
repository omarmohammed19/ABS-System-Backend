import { UserSessionsModel, UserSessions } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_sys_UserSessions] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as UserSessionsModel;
}

export class UserSessionsController {

    async index(language: string, isActive: number): Promise<UserSessionsModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_sys_UserSessions] @language = :language, @Method = :Method, @isActive = :isActive';
            const replacements = { language: language, Method: 'GET', isActive: isActive };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as UserSessionsModel[];
        }
        catch (err) {
            throw new Error(`Could not get all UserSessions. Error: ${err}`);
        }
    }

    async create(userSession: UserSessionsModel): Promise<UserSessionsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await UserSessions.create(
                    {
                        userID: userSession.userID,
                        loginTime: userSession.loginTime,
                        logoutTime: userSession.logoutTime,
                        isActive: true,
                    },
                    { transaction: t }
                );
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not add new UserSession. Error: ${err}`);
        }
    }

    async getUserSessionByUserID(ID: number, language: string): Promise<UserSessionsModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not get UserSession by ID. Error: ${err}`);
        }
    }

    async update(userSession: UserSessionsModel, language?: string): Promise<UserSessionsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await userSession.update(
                    {
                        userID: userSession.userID,
                        loginTime: userSession.loginTime,
                        logoutTime: userSession.logoutTime,
                    },
                    {
                        where: {
                            ID: userSession.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const updatedBranch = getById(userSession.ID, t, language);
                return updatedBranch;
            });
        }
        catch (err) {
            throw new Error(`Could not update User Session. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<UserSessionsModel>(UserSessions, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate User Session. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<UserSessionsModel>(UserSessions, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate User Session. Error: ${err}`);
        }
    }
}



