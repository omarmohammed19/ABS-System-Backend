import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { subAccount } from '../Models2/subAccount';

dotenv.config();

export class subAccountController {
  async getSubAccountByID(id: number): Promise<subAccount> {
    try {
      console.log('id', id);
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetsubAccountByID]');
      pool.close();
      return result.recordset[0];
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
        .input('mainAccountNumber', sql.NVarChar, subAccount.mainAccountNumber)
        .input('subAccountName', sql.NVarChar, subAccount.subAccountName)
        .input('accountNumber', sql.NVarChar, subAccount.accountNumber)
        .input('pricePlanID', sql.Int, subAccount.pricePlanID)
        .input('paymentMethodID', sql.Int, subAccount.paymentMethodID)
        .input('productTypeID', sql.Int, subAccount.productTypeID)
        .input('registrationDate', sql.Date, subAccount.registrationDate)
        .execute('[dbo].[p_SavesubAccount]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add sub-account ${error}`);
    }
  }
  async getSubAccount(): Promise<subAccount[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetsubAccount]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get sub-accounts ${error}`);
    }
  }
  async deleteSubAccount(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeletesubAccount]');
      pool.close();
      if (result.returnValue === 0) {
        return 'Sub-account deleted successfully';
      } else {
        return 'Sub-account not found';
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Could not delete the sub-account ${error}`);
    }
  }
  async updateSubAccount(subAccount: subAccount): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, subAccount.ID)
        .input('mainAccountNumber', sql.NVarChar, subAccount.mainAccountNumber)
        .input('subAccountName', sql.NVarChar, subAccount.subAccountName)
        .input('accountNumber', sql.NVarChar, subAccount.accountNumber)
        .input('pricePlanID', sql.Int, subAccount.pricePlanID)
        .input('paymentMethodID', sql.Int, subAccount.paymentMethodID)
        .input('productTypeID', sql.Int, subAccount.productTypeID)
        .input('registrationDate', sql.Date, subAccount.registrationDate)
        .execute('[dbo].[p_UpdatesubAccount]');
      pool.close();
      return 'Sub-account updated successfully';
    } catch (error) {
      console.log(error);
      throw new Error(`Could not update the sub-account ${error}`);
    }
  }

  async getPaymentMethodByID(id: number): Promise<subAccount> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('subaccountID', sql.BigInt, id).execute('[dbo].[p_GetpaymentMethodsBysubaccountID]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get payment method${error}`);
    }
  }

  async getPricePlanByID(id: number): Promise<subAccount> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetsubAccountPricePlanByID]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get price plan${error}`);
    }
  }
}
