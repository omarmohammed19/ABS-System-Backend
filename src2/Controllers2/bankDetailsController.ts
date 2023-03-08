import { BankDetails } from "../Models2/bankDetailsModel";
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import bcrypt from "bcrypt";

dotenv.config();
const {
    SALT_ROUNDS,
    pepper
} = process.env

export class bankDetailsController {

    async index(): Promise<BankDetails[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetbankDetails]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all BankDetails. Error: ${err}`)
        }
    }

    async getBankDetailsByID(id: number): Promise<BankDetails> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankDetailID", sql.BigInt, id)
                .execute('[dbo].[p_GetbankDetailsByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all BankDetails. Error: ${err}`)
        }
    }

    async create(bankDetails: BankDetails): Promise<BankDetails> {
        try {
            //@ts-ignore
            const accountNumberHashed = await bcrypt.hashSync(bankDetails.accountNumber + pepper, parseInt(SALT_ROUNDS));
            //@ts-ignore
            const IBANHashed = await bcrypt.hashSync(bankDetails.IBAN + pepper, parseInt(SALT_ROUNDS));
            //@ts-ignore
            const swiftCodeHashed = await bcrypt.hashSync(bankDetails.swiftCode + pepper, parseInt(SALT_ROUNDS));
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("accountHolderName", sql.NVarChar, bankDetails.accountHolderName)
                .input("accountNumber", sql.NVarChar, accountNumberHashed)
                .input("bankNameID", sql.Int, bankDetails.bankNameID)
                .input("IBAN", sql.NVarChar, IBANHashed)
                .input("swiftCode", sql.NVarChar, swiftCodeHashed)
                .execute('[dbo].[p_SavebankDetails]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new BankDetails ${bankDetails.accountHolderName}. Error: ${err}`)
        }
    }

    async update(B: BankDetails): Promise<string> {
        try {
            //@ts-ignore
            const accountNumberHashed = await bcrypt.hashSync(B.accountNumber + pepper, parseInt(SALT_ROUNDS));
            //@ts-ignore
            const IBANHashed = await bcrypt.hashSync(B.IBAN + pepper, parseInt(SALT_ROUNDS));
            //@ts-ignore
            const swiftCodeHashed = await bcrypt.hashSync(B.swiftCode + pepper, parseInt(SALT_ROUNDS));
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankDetailID", sql.BigInt, B.bankDetailID)
                .input("accountHolderName", sql.NVarChar, B.accountHolderName)
                .input("accountNumber", sql.NVarChar, B.accountNumber)
                .input("bankNameID", sql.Int, B.bankNameID)
                .input("IBAN", sql.NVarChar, B.IBAN)
                .input("swiftCode", sql.NVarChar, B.swiftCode)
                .execute('[dbo].[p_UpdatebankDetails]');
            pool.close();
            return "BankDetails updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update BankDetails ${B.accountHolderName}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("bankDetailID", sql.BigInt, id)
                .execute('[dbo].[p_DeletebankDetails]');
            pool.close();
            if (result.returnValue === 0) {
                return "BankDetails deleted successfully";
            }
            else {
                return "BankDetails not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete BankDetails ${id}. Error: ${err}`)
        }
    }
    async getBankDetailsBysubAccountID(subAccountID: number): Promise<BankDetails> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("subAccountID", sql.BigInt, subAccountID)
                .execute('[dbo].[p_GetbankDetailsBysubAccountID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all BankDetails. Error: ${err}`)
        }
    }
}