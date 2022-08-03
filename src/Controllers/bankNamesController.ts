import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { BankName } from "../Models/bankNamesModel";

dotenv.config();

export class bankNamesController {
    async index(): Promise<BankName[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetbankNames]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all BankNames. Error: ${err}`)
        }
    }

    async getBankNameByID(id: number): Promise<BankName> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankNameID", sql.BigInt, id)
                .execute('[dbo].[p_GetbankNamesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all BankNames. Error: ${err}`)
        }
    }

    async create(bankName: BankName): Promise<BankName> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankName", sql.NVarChar, bankName.bankName)
                .execute('[dbo].[p_SavebankNames]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new BankName ${bankName.bankName}. Error: ${err}`)
        }
    }

    async update(B: BankName): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankNameID", sql.BigInt, B.bankNameID)
                .input("bankName", sql.NVarChar, B.bankName)
                .execute('[dbo].[p_UpdatebankNames]');
            pool.close();
            return "Bank Name updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update BankName ${B.bankName}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankNameID", sql.BigInt, id)
                .execute('[dbo].[p_DeletebankNames]');
            pool.close();
            if(result.returnValue === 0) {
                return "Bank Name deleted successfully";
            }
            else{
                return "Bank Name not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete BankName ${id}. Error: ${err}`)
        }
    }
}