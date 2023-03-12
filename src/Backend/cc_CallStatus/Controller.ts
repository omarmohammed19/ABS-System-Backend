import { CallStatus, CallStatusModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string,) => {
    const attributes = (language === 'en') ? ['ID', 'enCallStatus', 'Notes'] : ['ID', 'arCallStatus', 'Notes'];
    return CallStatus.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class CallStatusController {

    async index(language: string): Promise<CallStatusModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const attributes = (language === 'en') ? ['ID', 'enCallStatus', 'Notes'] : ['ID', 'arCallStatus', 'Notes'];
                const result = await CallStatus.findAll({
                    attributes: attributes,
                    where: {
                        isActive: true,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as CallStatusModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all CallStatus. Error: ${err}`);
        }

    }

    async create(callStatus: CallStatusModel): Promise<CallStatusModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await CallStatus.create(
                    {
                        enCallStatus: callStatus.enCallStatus,
                        arCallStatus: callStatus.arCallStatus,
                        Notes: callStatus.Notes,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new CallStatus';
            });

        }
        catch (err) {
            throw new Error(`Could not add new CallStatus. Error: ${err}`);
        }
    }


    async getCallStatusByID(language: string, ID: number): Promise<CallStatusModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get CallStatus by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get CallStatus by ID. Error: ${err}`);
        }
    }

    async update(callStatus: CallStatusModel): Promise<CallStatusModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await CallStatus.update(
                    {
                        enCallStatus: callStatus.enCallStatus,
                        arCallStatus: callStatus.arCallStatus,
                        Notes: callStatus.Notes,
                    },
                    {
                        where: {
                            ID: callStatus.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(callStatus.ID), t);
                return result ? result.toJSON() : 'Could not update CallStatus';
            });
        }
        catch (err) {
            throw new Error(`Could not update CallStatus. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = De_Activate<CallStatusModel>(CallStatus, ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate CallStatus. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = De_Activate<CallStatusModel>(CallStatus, ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate CallStatus. Error: ${err}`);
        }
    }
}
