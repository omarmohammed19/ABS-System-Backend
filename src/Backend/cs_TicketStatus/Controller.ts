import { TicketStatus, TicketStatusModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string,) => {
    return TicketStatus.findOne({
        attributes: language === 'en' ? ['ID', 'enStatus', 'Notes'] : [['ID', 'ID'], ['arStatus', 'حالة التذكرة '], ['Notes', 'ملحوظات']],
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class TicketStatusController {

    async index(language: string, isActive: number): Promise<TicketStatusModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await TicketStatus.findAll({
                    attributes: language === 'en' ? ['ID', 'enStatus', 'Notes'] : [['ID', 'ID'], ['arStatus', 'حالة التذكرة '], ['Notes', 'ملحوظات']],
                    where: {
                        isActive: isActive,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as TicketStatusModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all TicketStatus. Error: ${err}`);
        }

    }

    async create(ticketStatus: TicketStatusModel): Promise<TicketStatusModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await TicketStatus.create(
                    {
                        enStatus: ticketStatus.enStatus,
                        arStatus: ticketStatus.arStatus,
                        Notes: ticketStatus.Notes,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new TicketStatus';
            });

        }
        catch (err) {
            throw new Error(`Could not add new TicketStatus. Error: ${err}`);
        }
    }


    async getTicketStatusByID(language: string, ID: number): Promise<TicketStatusModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item;
            });
            return result ? result.toJSON() : 'Could not get TicketStatus by ID';
        } catch (err) {
            throw new Error(`Could not get TicketStatus by ID. Error: ${err}`);
        }
    }

    async update(ticketStatus: TicketStatusModel): Promise<TicketStatusModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await TicketStatus.update(
                    {
                        enStatus: ticketStatus.enStatus,
                        arStatus: ticketStatus.arStatus,
                        Notes: ticketStatus.Notes,
                    },
                    {
                        where: {
                            ID: ticketStatus.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(ticketStatus.ID), t);
                return result ? result.toJSON() : 'Could not update TicketStatus';
            });
        }
        catch (err) {
            throw new Error(`Could not update Status. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketStatusModel>(TicketStatus, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate TicketStatus. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketStatusModel>(TicketStatus, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate TicketStatus. Error: ${err}`);
        }
    }
}
