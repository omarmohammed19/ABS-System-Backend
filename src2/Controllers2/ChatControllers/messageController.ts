import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../../Config/database";
import { messages } from '../../Models2/messagesModel';

dotenv.config();


export class MessageController {
    async index(): Promise<messages[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetMessages]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Messages. Error: ${err}`)
        }
    }

    async getMessageByID(id: number): Promise<messages[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ConversationID", sql.BigInt, id)
                .execute('[dbo].[p_GetMessageByID]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Messages. Error: ${err}`)
        }
    }

    async create(M: messages): Promise<messages> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ConversationID", sql.BigInt, M.ConversationID)
                .input("SenderID", sql.BigInt, M.SenderID)
                .input("Text", sql.NVarChar, M.Text)
                .execute('[dbo].[p_SaveMessages]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new Message Error: ${err}`)
        }
    }
}