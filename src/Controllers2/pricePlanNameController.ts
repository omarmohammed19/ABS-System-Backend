import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config2/database';
import { pricePlanNameModel } from '../Models2/pricePlanNameModel';

dotenv.config();

export class pricePlanNameController {
  async index(): Promise<pricePlanNameModel[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('p_GetpricePlanName');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get pricePlanName ${error}`);
    }
  }

  async addpricePlanName(ppn: pricePlanNameModel): Promise<pricePlanNameModel> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('Name', sql.NVarChar, ppn.Name).execute('p_SavepricePlanName');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add pricePlanName ${error}`);
    }
  }

  async updatePricePlanName(ppn: pricePlanNameModel): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, ppn.ID).input('Name', sql.NVarChar, ppn.Name).execute('p_UpdatepricePlanName');
      pool.close();
      return 'Updated';
    } catch (error) {
      throw new Error(`Could not update pricePlanName ${error}`);
    }
  }

  async deletePricePlanName(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('p_DeletepricePlanName');
      pool.close();
      return 'Deleted';
    } catch (error) {
      throw new Error(`Could not delete pricePlanName ${error}`);
    }
  }

  async getPricePlanNameByID(id: number): Promise<pricePlanNameModel> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('p_GetpricePlanNameByID');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get pricePlanName ${error}`);
    }
  }
}
