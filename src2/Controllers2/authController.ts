import dotenv from 'dotenv';
import { sqlConfig } from '../Config/database';
import * as sql from 'mssql/msnodesqlv8';
import { webUsers } from '../Models2/webUsers';

dotenv.config();

export class authController {
  async handlesignin(userCred: string, password: string): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('userCred', sql.NVarChar, userCred).execute('[dbo].[p_GetwebUsersByCredentials]');
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }
  }

  async handleLogin(username: string, password: string): Promise<webUsers> {
    //@ts-ignore
    const pool = await new sql.ConnectionPool(sqlConfig).connect();
    const result = await pool.request().input('username', sql.NVarChar, username).execute('[dbo].[p_GetwebUsersByUsername]');
    return result.recordset[0];
  }

  async handleLoginByEmail(email: string, password: string): Promise<webUsers> {
    //@ts-ignore
    const pool = await new sql.ConnectionPool(sqlConfig).connect();
    const result = await pool.request().input('email', sql.NVarChar, email).execute('[dbo].[p_GetwebUsersByEmail]');
    return result.recordset[0];
  }

  async handleLoginByMobile(mobile: string, password: string): Promise<webUsers> {
    //@ts-ignore
    const pool = await new sql.ConnectionPool(sqlConfig).connect();
    const result = await pool.request().input('mobile', sql.NVarChar, mobile).execute('[dbo].[p_GetwebUsersByMobile]');
    return result.recordset[0];
  }

  async getUserInfo(subAccountID: number): Promise<webUsers> {
    //@ts-ignore
    const pool = await new sql.ConnectionPool(sqlConfig).connect();
    const result = await pool.request().input('subAccountID', sql.Int, subAccountID).execute('[dbo].[p_GetcustInfoOnLogin]');

    return result.recordset[0];
  }
}
