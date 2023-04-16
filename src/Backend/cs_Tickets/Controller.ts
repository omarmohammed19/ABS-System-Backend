import { TicketsModel, Tickets } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';


const getById = (ID: number, t: Transaction, language?: string) => {

    const query = 'EXEC [dbo].[p_GET_cs_Tickets] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options)
    return result as unknown as TicketsModel;
}


export class TicketsController {

    async index(language: string, isActive: number, isClosed: number, limits?: number): Promise<TicketsModel[]> {
        const limit = limits || 10;
        try {
            const query = 'EXEC [dbo].[p_GET_cs_Tickets] @language = :language, @Method = :Method, @isActive= :isActive, @isClosed= :isClosed, @limit = :limit';
            const replacements = { language: language, Method: 'GET', isActive: isActive, isClosed: isClosed, limit: limit };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TicketsModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Tickets. Error: ${err}`);
        }
    }


    async create(ticket: TicketsModel): Promise<TicketsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Tickets.create(
                    {
                        AWB: ticket.AWB,
                        ticketTypeID: ticket.ticketTypeID,
                        ticketStatusID: 1,
                        Description: ticket.Description,
                        creationDate: ticket.creationDate,
                        lastActionDate: ticket.lastActionDate,
                        userID: ticket.userID,
                        documentPath: ticket.documentPath,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not add new Ticket. Error: ${err}`);
        }
    }


    async getTicketByID(ID: number, language: string): Promise<TicketsModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not get Ticket by ID. Error: ${err}`);
        }
    }


    async getTicketsByAWB(language: string, isActive: number, AWB: string): Promise<TicketsModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cs_Tickets] @language = :language, @Method = :Method, @isActive= :isActive, @AWB= :AWB';
            const replacements = { language: language, Method: 'GET_ByAWB', isActive: isActive, AWB: AWB };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TicketsModel[];
        }
        catch (err) {
            throw new Error(`Could not get Tickets by AWB. Error: ${err}`);
        }
    }

    async getTicketsBySubAccountID(language: string, subAccountID: number, isActive: number, limit: number): Promise<TicketsModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cs_Tickets] @language = :language, @Method = :Method, @isActive= :isActive, @subAccountID= :subAccountID, @limit= :limit';
            const replacements = { language: language, Method: 'GET_BySubAccountID', isActive: isActive, subAccountID: subAccountID, limit: limit };
            console.log(replacements);
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TicketsModel[];
        }
        catch (err) {
            throw new Error(`Could not get Tickets by sub-account ID. Error: ${err}`);
        }
    }


    async update(ticket: TicketsModel, language: string): Promise<TicketsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Tickets.update(
                    {
                        AWB: ticket.AWB,
                        ticketTypeID: ticket.ticketTypeID,
                        ticketStatusID: ticket.ticketStatusID,
                        Description: ticket.Description,
                        creationDate: ticket.creationDate,
                        lastActionDate: ticket.lastActionDate,
                        userID: ticket.userID,
                        documentPath: ticket.documentPath,
                    },
                    {
                        where: {
                            ID: ticket.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const updatedTicket = getById(ticket.ID, t, language);
                return updatedTicket;
            });
        }
        catch (err) {
            throw new Error(`Could not update Ticket. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketsModel>(Tickets, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Ticket. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketsModel>(Tickets, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Ticket. Error: ${err}`);
        }
    }
}