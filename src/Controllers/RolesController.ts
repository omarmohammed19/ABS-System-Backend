import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { Roles } from '../Models/Roles';

dotenv.config();

export class RolesController {
    async getClientRoles(): Promise<Roles[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().execute('[dbo].[p_GetClientRoles]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Roles. Error: ${err}`)
        }
    }
}
