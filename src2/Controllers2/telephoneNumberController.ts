import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { telephoneNumber } from '../Models2/telephoneNumber';

dotenv.config();

export class telephoneNumberController {
  async getTelephoneNumberByID(id: number): Promise<telephoneNumber[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GettelephoneNumberByID]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get orders ${error}`);
    }
  }
  async addTelephoneNumber(telephoneNumber: telephoneNumber): Promise<telephoneNumber> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('telephoneNumber', sql.NVarChar, telephoneNumber.telephoneNumber)
        .input('userInfoID', sql.Int, telephoneNumber.userInfoID)
        .input('companyInfoID', sql.Int, telephoneNumber.companyInfoID)
        .input('contactPersonID', sql.Int, telephoneNumber.contactPersonID)
        .input('telephoneTypeID', sql.Int, telephoneNumber.telephoneTypeID)
        .execute('[dbo].[p_SavetelephoneNumber]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add telephoneNumber ${error}`);
    }
  }
  async getTelephoneNumber(): Promise<telephoneNumber[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GettelephoneNumber]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get orders ${error}`);
    }
  }
  async deleteTelephoneNumber(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeletetelephoneNumber]');
      pool.close();
      if (result.returnValue === 0) {
        return 'Telephone number deleted successfully';
      } else {
        return 'Telephone number is not found';
      }
    } catch (error) {
      throw new Error(`Could not delete telephone number ${error}`);
    }
  }
  async updateTelephoneNumber(telephoneNumber: telephoneNumber): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, telephoneNumber.ID)
        .input('telephoneNumber', sql.NVarChar, telephoneNumber.telephoneNumber)
        .input('userInfoID', sql.Int, telephoneNumber.userInfoID)
        .input('companyInfoID', sql.Int, telephoneNumber.companyInfoID)
        .input('contactPersonID', sql.Int, telephoneNumber.contactPersonID)
        .input('telephoneTypeID', sql.Int, telephoneNumber.telephoneTypeID)
        .execute('[dbo].[p_UpdatetelephoneNumber]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not update telephoneNumber ${error}`);
    }
  }
}
