import Sequelize from 'sequelize';
import { sequelize } from '../../Config/database';

export class EmployeeTicketsController {
    async getAllTickets(language: string, limit: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @limit = :limit';
                const replacements = { Method: 'Get_All', language: language, limit: limit };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getOpenedTickets(language: string, limit: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @limit = :limit';
                const replacements = { Method: 'GET_Opened', language: language, limit: limit };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getClosedTickets(language: string, limit: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @limit = :limit';
                const replacements = { Method: 'GET_Closed', language: language, limit: limit };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getTicketByID(language: string, ID: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @ID = :ID';
                const replacements = { Method: 'GET_ByID', language: language, ID: ID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result[0] as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getTicketByAWB(language: string, AWB: string): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @AWB = :AWB';
                const replacements = { Method: 'GET_ByAWB', language: language, AWB: AWB };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getTicketBySubAccountID(language: string, subAccountID: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @subAccountID = :subAccountID';
                const replacements = { Method: 'GET_BySubAccountID', language: language, subAccountID: subAccountID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getTicketByMainAccountID(language: string, mainAccountID: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @mainAccountID = :mainAccountID';
                const replacements = { Method: 'GET_ByMainAccountID', language: language, mainAccountID: mainAccountID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async getTicketByCreationDateRange(language: string, fromDate: string, toDate: string): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_Complains_For_Employee] @Method = :Method , @language = :language , @fromDate = :fromDate, @toDate = :toDate';
                const replacements = { Method: 'GET_ByCreationDateRange', language: language, fromDate: fromDate, toDate: toDate };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }
}