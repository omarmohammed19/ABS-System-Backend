import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { webUsers } from '../Models/webUsers';

dotenv.config();

export class webUsersController {
  async getWebUsersByID(id: number): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetwebUsersByID]');
      //   console.log(result);
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }
  }
  
  async addWebUser(user: webUsers): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('userName', sql.NVarChar, user.userName)
        .input('webUserPassword', sql.NVarChar, user.webUserPassword)
        .execute('[dbo].[p_SavewebUsers]');
      console.log(user);
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add a new user ${error}`);
    }
  }
  async getwebUsers(): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetwebUsers]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the Users ${error}`);
    }
  }
  async deleteWebUser(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeletewebUsers]');
      pool.close();
      if (result.returnValue === 0) {
        console.log(result);
        return 'The user deleted successfully';
      } else {
        return 'The user could not be deleted';
      }
    } catch (error) {
      throw new Error(`Could not delete the user ${error}`);
    }
  }
  async updateWebUser(user: webUsers): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, user.ID)
        .input('userName', sql.NVarChar, user.userName)
        .input('webUserPassword', sql.NVarChar, user.webUserPassword)
        .execute('[dbo].[p_UpdatewebUsers]');
      console.log(user);
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not update the user ${error}`);
    }
  }
}
