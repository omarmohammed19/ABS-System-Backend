import { CallPlansModel, CallPlans } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cc_CallPlans] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as CallPlansModel;
};

export class CallPlansController {

    async index(language: string, limits?: number): Promise<CallPlansModel[]> {
        const limit = limits || 10;
        try {
            const query =
                'EXEC [dbo].[p_GET_cc_CallPlans] @language = :language, @Method = :Method, @limit = :limit';
            const replacements = { language: language, Method: 'GET', limit: limit };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as CallPlansModel[];
        } catch (err) {
            throw new Error(`Could not get all Call Plans. Error: ${err}`);
        }
    }

    async create(callPlan: CallPlansModel): Promise<string> {
        try {
            return await sequelize.transaction(async (t) => {

                //@ts-ignore
                const AWBs: string[] = callPlan.AWB;

                const formattedCallPlans = AWBs.map((AWB) => ({
                    AWB,
                    callTypeID: callPlan.callTypeID,
                    callStatusID: 1,
                    assignedBy: callPlan.assignedBy,
                    assignedTo: callPlan.assignedTo,
                    assignedAt: Sequelize.literal('CURRENT_TIMESTAMP'), // Use Sequelize.literal for the current timestamp
                    Notes: callPlan.Notes
                }));

                await CallPlans.bulkCreate(formattedCallPlans, { transaction: t });

                return "Call Plan added successfully";
            });
        } catch (err) {
            throw new Error(`Could not add new Call Plan. Error: ${err}`);
        }
    }

    async getCallPlanByID(ID: number, language: string): Promise<CallPlansModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        } catch (err) {
            throw new Error(`Could not get Call Plan by ID. Error: ${err}`);
        }
    }

    async update(callPlan: CallPlansModel, language: string): Promise<CallPlansModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                await CallPlans.update(
                    {
                        AWB: callPlan.AWB,
                        callTypeID: callPlan.callTypeID,
                        callStatusID: callPlan.callStatusID,
                        callResultID: callPlan.callResultID,
                        assignedBy: callPlan.assignedBy,
                        assignedTo: callPlan.assignedTo,
                        assignedAt: callPlan.assignedAt,
                        callDate: callPlan.callDate,
                        Notes: callPlan.Notes,
                    },
                    {
                        where: {
                            ID: callPlan.ID,
                        },
                        transaction: t, // pass transaction object to query
                    }
                );
                const updatedTicket = getById(callPlan.ID, t, language);
                return updatedTicket;
            });
        } catch (err) {
            throw new Error(`Could not update Call Plan. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<CallPlansModel>(CallPlans, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Call Plan. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<CallPlansModel>(CallPlans, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Call Plan. Error: ${err}`);
        }
    }


}