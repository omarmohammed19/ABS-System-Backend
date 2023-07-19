import { CallHistoryModel, CallHistory } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cc_CallHistory] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as CallHistoryModel;
};

const getByAWB = (AWB: string, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cc_CallHistory] @language = :language, @Method = :Method, @AWB = :AWB';
    const replacements = { language: language, Method: 'GET_ByAWB', AWB: AWB };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as CallHistoryModel;
};

export class CallHistoryController {

    async index(language: string, limits?: number): Promise<CallHistoryModel[]> {
        const limit = limits || 10;

        try {
            return await sequelize.transaction(async (t) => {
                const query =
                    'EXEC [dbo].[p_GET_cc_CallHistory] @language = :language, @Method = :Method, @limit = :limit';
                const replacements = { language: language, Method: 'GET', limit: limit };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as CallHistoryModel[];
            });
        } catch (err) {
            throw new Error(`Could not get all Call History. Error: ${err}`);
        }
    }

    async getByAWB(AWB: string, language: string): Promise<CallHistoryModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getByAWB(AWB, t, language);
                return result as unknown as CallHistoryModel;
            });
        } catch (err) {
            throw new Error(`Could not get Call History. Error: ${err}`);
        }
    }

    async create(callHistory: CallHistoryModel): Promise<string> {
        try {
            return await sequelize.transaction(async (t) => {
                await CallHistory.create(
                    {
                        AWB: callHistory.AWB,
                        callTypeID: callHistory.callTypeID,
                        callStatusID: callHistory.callStatusID,
                        callResultID: callHistory.callResultID,
                        assignedBy: callHistory.assignedBy,
                        assignedTo: callHistory.assignedTo,
                        assignedAt: callHistory.assignedAt,
                        callDate: callHistory.callDate,
                        Notes: callHistory.Notes,
                    }
                    , { transaction: t }
                );

                return "Call History added successfully";
            });
        } catch (err) {
            throw new Error(`Could not add new Call History. Error: ${err}`);
        }
    }


    async getByID(ID: number, language: string): Promise<CallHistoryModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        } catch (err) {
            throw new Error(`Could not get Call History by ID. Error: ${err}`);
        }
    }

    async update(callHistory: CallHistoryModel, language: string): Promise<CallHistoryModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                const result = await CallHistory.update(
                    {
                        AWB: callHistory.AWB,
                        callTypeID: callHistory.callTypeID,
                        callStatusID: callHistory.callStatusID,
                        callResultID: callHistory.callResultID,
                        assignedBy: callHistory.assignedBy,
                        assignedTo: callHistory.assignedTo,
                        assignedAt: callHistory.assignedAt,
                        callDate: callHistory.callDate,
                        Notes: callHistory.Notes,
                    },
                    { where: { ID: callHistory.ID }, transaction: t }
                );
                return getById(callHistory.ID, t, language);
            });
        } catch (err) {
            throw new Error(`Could not update Call History. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<CallHistoryModel>(CallHistory, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Call Plan. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<CallHistoryModel>(CallHistory, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Call Plan. Error: ${err}`);
        }
    }


}