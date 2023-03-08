import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config2/database';
import { ticketCategories } from '../Models2/ticketCategories';

dotenv.config();

export class ticketCategoriesController {
    async addTicketCategory(ticketCategory: ticketCategories): Promise<ticketCategories> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().input('Category', sql.NVarChar, ticketCategory.Category).execute('[dbo].[p_SaveticketCategories]');
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add ticket category ${error}`);
        }
    }
    async getTicketCategory(): Promise<ticketCategories[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().execute('[dbo].[p_GetTicketCategories]');
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get ticket categories ${error}`);
        }
    }
    async deleteTicketCategory(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeleteTicketCategories]');
            pool.close();
            if (result.returnValue === 0) {
                return 'Ticket category deleted successfully';
            } else {
                return 'Ticket category could not be deleted';
            }
        } catch (error) {
            throw new Error(`Could not delete ticket category ${error}`);
        }
    }

    async getTicketCategoryByID(id: number): Promise<ticketCategories> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetTicketCategoriesByID]');
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get ticket category ${error}`);
        }
    }

    async updateTicketCategory(ticketCategory: ticketCategories): Promise<ticketCategories> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().input('ID', sql.BigInt, ticketCategory.ID).input('Category', sql.NVarChar, ticketCategory.Category).execute('[dbo].[p_UpdateTicketCategories]');
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not update ticket category ${error}`);
        }
    }

}