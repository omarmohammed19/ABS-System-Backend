import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../../Config/database";
import { Conversation } from "../../Models/ConversationModel";

dotenv.config();

export class ConversationsController {

    // async index(): Promise<Conversation[]> {
    //     try {
    //         //@ts-ignore
    //         const pool = await new sql.ConnectionPool(sqlConfig).connect();
    //         const result = await pool.request()
    //             .execute('[dbo].[p_GetConversations]');
    //         return result.recordset;
    //     }
    //     catch (err) {
    //         throw new Error(`Could not get all Conversations. Error: ${err}`)
    //     }
    // }

    // async getConversationByID(id: number): Promise<Conversation> {
    //     try {
    //         //@ts-ignore
    //         const pool = await new sql.ConnectionPool(sqlConfig).connect();
    //         const result = await pool.request()
    //             .input("ID", sql.BigInt, id)
    //             .execute('[dbo].[p_GetConversationsByID]');
    //         return result.recordset[0];
    //     }
    //     catch (err) {
    //         throw new Error(`Could not get all Conversations. Error: ${err}`)
    //     }
    // }

    async create(C: Conversation): Promise<Conversation> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("MemberID", sql.BigInt, C.MemberID)
                .execute('[dbo].[p_SaveConversations]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new Conversation ${C.conversattionID}. Error: ${err}`)
        }
    }

    // async update(C: Conversation): Promise<string> {
    //     try {
    //         //@ts-ignore
    //         const pool = await new sql.ConnectionPool(sqlConfig).connect();
    //         const result = await pool.request()
    //             .input("ID", sql.BigInt, C.conversattionID)
    //             .input("memberID1", sql.BigInt, C.memberID1)
    //             .input("memberID2", sql.BigInt, C.memberID2)
    //             .execute('[dbo].[p_UpdateConversations]');
    //         pool.close();
    //         return result.recordset[0];
    //     }
    //     catch (err) {
    //         throw new Error(`Could not update Conversation ${C.conversattionID}. Error: ${err}`)
    //     }
    // }
}