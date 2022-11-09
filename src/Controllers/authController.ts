import dotenv from 'dotenv';
import { sqlConfig } from "../Config/database";
import * as sql from "mssql/msnodesqlv8";
import { webUsers } from '../Models/webUsers';

dotenv.config();


export class authController {
    async handleLogin(username: string, password: string): Promise<webUsers> {

        //@ts-ignore
        const pool = await new sql.ConnectionPool(sqlConfig).connect();
        const result = await pool.request()
            .input("username", sql.NVarChar, username)
            .execute('[dbo].[p_GetwebUsersByUsername]');
        return result.recordset[0];
    }

    async getUserInfo(subAccountID: number): Promise<webUsers> {
        //@ts-ignore
        const pool = await new sql.ConnectionPool(sqlConfig).connect();
        const result = await pool.request()
            .input("subAccountID", sql.Int, subAccountID)
            .execute('[dbo].[p_GetcustInfoOnLogin]');

        return result.recordset[0];
    }
}