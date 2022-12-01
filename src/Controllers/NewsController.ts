import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { News } from '../Models/News';

dotenv.config();


export class NewsController {

    async index(): Promise<News[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetNews");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get News ${error}`);
        }
    }

    async getNewsByID(ID: number): Promise<News> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, ID)
                .execute("p_GetNewsByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get News ${error}`);
        }
    }

    async addNews(news: News): Promise<News[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('News', sql.NVarChar, news.News)
                .execute("p_SaveNews");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not add News ${error}`);
        }
    }

    async updateNews(news: News): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, news.ID)
                .input('News', sql.NVarChar, news.News)
                .input('Active', sql.NVarChar, news.Active)
                .execute("p_UpdateNews");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update News ${error}`);
        }
    }

    async deleteNews(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .execute("p_Deletenews");
            pool.close();
            return "Deleted";
        } catch (error) {
            throw new Error(`Could not delete News ${error}`);
        }
    }

    async activateNews(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .execute("p_ActivateNews");
            pool.close();
            return "Activated";
        } catch (error) {
            throw new Error(`Could not activate News ${error}`);
        }
    }

    async deactivateNews(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .execute("p_DeactivateNews");
            pool.close();
            return "Deactivated";
        } catch (error) {
            throw new Error(`Could not deactivate News ${error}`);
        }
    }

    async getActiveNews(): Promise<News[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetActiveNews");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get News ${error}`);
        }
    }

}