import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../../Config/database";
import { Conversation } from "../../Models/ConversationModel";

dotenv.config();

export class ConversationsController {

    async getConversationByID(id: number): Promise<Conversation[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("MemberID", sql.BigInt, id)
                .execute('[dbo].[p_GetConversationByID]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Conversations. Error: ${err}`)
        }
    }

    //get conversation friend by id
    async getConversationFriendByID(id: number, convoId: number): Promise<Conversation[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("MemberID", sql.BigInt, id)
                .input("ConversationID", sql.BigInt, convoId)
                .execute('[dbo].[p_GetConversationFriendByID]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Conversations. Error: ${err}`)
        }
    }


    async create(C: Conversation): Promise<Conversation> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("MemberID1", sql.BigInt, C.MemberID1)
                .input("MemberID2", sql.BigInt, C.MemberID2)
                .execute('[dbo].[p_SaveConversations]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new Conversation Error: ${err}`)
        }
    }


}