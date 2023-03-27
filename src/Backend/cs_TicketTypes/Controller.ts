import { TicketTypes, TicketTypesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string,) => {
    return TicketTypes.findOne({
        attributes: language === 'en' ? ['ID', 'enTicketType', 'Notes'] : [['ID', 'ID'], ['arTicketType', 'نوع التذكرة'], ['Notes', 'ملحوظات']],
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class TicketTypesController {

    async index(language: string, isActive: number): Promise<TicketTypesModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await TicketTypes.findAll({
                    attributes: language === 'en' ? ['ID', 'enTicketType', 'Notes'] : [['ID', 'ID'], ['arTicketType', 'نوع التذكرة'], ['Notes', 'ملحوظات']],
                    where: {
                        isActive: isActive,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as TicketTypesModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all TicketTypes. Error: ${err}`);
        }

    }

    async create(ticketType: TicketTypesModel): Promise<TicketTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await TicketTypes.create(
                    {
                        enTicketType: ticketType.enTicketType,
                        arTicketType: ticketType.arTicketType,
                        Notes: ticketType.Notes,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new TicketType';
            });

        }
        catch (err) {
            throw new Error(`Could not add new TicketType. Error: ${err}`);
        }
    }


    async getTicketTypeByID(language: string, ID: number): Promise<TicketTypesModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get TicketType by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get TicketType by ID. Error: ${err}`);
        }
    }

    async update(ticketType: TicketTypesModel): Promise<TicketTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await TicketTypes.update(
                    {
                        enTicketType: ticketType.enTicketType,
                        arTicketType: ticketType.arTicketType,
                        Notes: ticketType.Notes,
                    },
                    {
                        where: {
                            ID: ticketType.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(ticketType.ID), t);
                return result ? result.toJSON() : 'Could not update TicketType';
            });
        }
        catch (err) {
            throw new Error(`Could not update TicketType. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketTypesModel>(TicketTypes, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate TicketType. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketTypesModel>(TicketTypes, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate TicketType. Error: ${err}`);
        }
    }
}
