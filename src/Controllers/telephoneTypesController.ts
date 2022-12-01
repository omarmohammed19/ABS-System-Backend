import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { telephoneTypes } from '../Models/telephoneTypes';

dotenv.config();

export class telephoneTypesController {
  async getTelephoneTypeByID(id: number): Promise<telephoneTypes[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GettelephoneTypesByID]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the telephone type ${error}`);
    }
  }
  async addTelephoneType(telephoneType: telephoneTypes): Promise<telephoneTypes> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('telephoneType', sql.NVarChar, telephoneType.telephoneType).execute('[dbo].[p_SavetelephoneTypes]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add telephone type ${error}`);
    }
  }
  async getTelephoneType(): Promise<telephoneTypes[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GettelephoneTypes]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get telephone types ${error}`);
    }
  }
  async deleteTelephoneType(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeletetelephoneTypes]');
      pool.close();
      if (result.returnValue === 0) {
        return 'Telephone type deleted successfully';
      } else {
        return 'Telephone type could not be deleted';
      }
    } catch (error) {
      throw new Error(`Could not delete telephone type ${error}`);
    }
  }
  async updateTelephoneType(telephoneType: telephoneTypes): Promise<telephoneTypes> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, telephoneType.ID)
        .input('telephoneType', sql.NVarChar, telephoneType.telephoneType)
        .execute('[dbo].[p_UpdatetelephoneTypes]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not update telephone type ${error}`);
    }
  }
}
