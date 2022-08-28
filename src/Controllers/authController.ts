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
}