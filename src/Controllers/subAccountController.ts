import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { subAccount } from '../Models/subAccount';

dotenv.config();

export class subAccountController {
  async getSubAccountByID(id: number): Promise<subAccount[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetsubAccountByID]');
      //   console.log(result);
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get orders ${error}`);
    }
  }
  async addSubAccount(subAccount: subAccount): Promise<subAccount> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('subAccountName', sql.NVarChar, subAccount.subAccountName)
        .input('accountNumber', sql.Int, subAccount.accountNumber)
        .input('pricePlanID', sql.Int, subAccount.pricePlanID)
        .input('paymentMethodID', sql.Int, subAccount.paymentMethodID)
        .input('productTypeID', sql.Int, subAccount.productTypeID)
        .execute('[dbo].[p_SavesubAccount]');
      console.log(subAccount);
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add subAccount ${error}`);
    }
  }
  async getSubAccount(): Promise<subAccount[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetsubAccount]');
      console.log(result);
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get orders ${error}`);
    }
  }
  async deleteSubAccount(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeletesubAccount]');
      pool.close();
      if (result.returnValue === 0) {
        console.log(result);
        return 'Sub-account deleted successfully';
      } else {
        return 'Sub-account not found';
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Could not delete the subAccount ${error}`);
    }
  }
  async updateSubAccount(subAccount: subAccount): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, subAccount.ID)
        .input('subAccountName', sql.NVarChar, subAccount.subAccountName)
        .input('accountNumber', sql.Int, subAccount.accountNumber)
        .input('pricePlanID', sql.Int, subAccount.pricePlanID)
        .input('paymentMethodID', sql.Int, subAccount.paymentMethodID)
        .input('productTypeID', sql.Int, subAccount.productTypeID)
        .execute('[dbo].[p_UpdatesubAccount]');
      pool.close();
      return 'Sub account updated successfully';
    } catch (error) {
      console.log(error);
      throw new Error(`Could not update the sub account ${error}`);
    }
  }
}
