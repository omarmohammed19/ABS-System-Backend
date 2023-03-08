import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { walletDetails } from '../Models2/walletDetails';

dotenv.config();

export class walletDetailsController {
  async getWalletDetailsByID(id: number): Promise<walletDetails[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.Int, id).execute('[dbo].[p_GetwalletDetailsByID]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the wallet details ${error}`);
    }
  }
  async addWalletDetail(wallet: walletDetails): Promise<walletDetails> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('walletNumber', sql.NVarChar, wallet.walletNumber)
        .input('mobileNumber', sql.NVarChar, wallet.mobileNumber)
        .execute('[dbo].[p_SavewalletDetails]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add a wallet detail ${error}`);
    }
  }
  async getWalletDetails(): Promise<walletDetails[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetwalletDetails]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the wallet details ${error}`);
    }
  }
  async deleteWalletDetails(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.Int, id).execute('[dbo].[p_DeletewalletDetails]');
      pool.close();
      if (result.returnValue === 0) {
        return 'The wallet details deleted successfully';
      } else {
        return 'The wallet details could not be deleted';
      }
    } catch (error) {
      throw new Error(`Could not delete the wallet details ${error}`);
    }
  }
  async updateWalletDetails(wallet: walletDetails): Promise<walletDetails> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.Int, wallet.ID)
        .input('mobileNumber', sql.NVarChar, wallet.mobileNumber)
        .input('walletNumber', sql.NVarChar, wallet.walletNumber)
        .execute('[dbo].[p_UpdatewalletDetails]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not update the wallet details ${error}`);
    }
  }

  async getWalletDetailsBysubAccountID(subAccountID: number): Promise<walletDetails> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('subAccountID', sql.Int, subAccountID).execute('[dbo].[p_GetwalletDetailsBysubAccountID]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get the wallet details ${error}`);
    }
  }
}
