import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { mobileCashModel } from "../Models2/mobileCashModel";

dotenv.config();

export class mobileCashController {
    async index(): Promise<mobileCashModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetMobileCash");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get mobile cash ${error}`);
        }
    }

    async get(id: number): Promise<mobileCashModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetMobileCashByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get mobile cash ${error}`);
        }
    }

    async add(mobileCash: mobileCashModel): Promise<mobileCashModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("mobileNumber", sql.NVarChar, mobileCash.mobileNumber)
                .execute("p_SaveMobileCash");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add mobile cash ${error}`);
        }
    }

    async update(mobileCash: mobileCashModel): Promise<mobileCashModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, mobileCash.ID)
                .input("mobileNumber", sql.NVarChar, mobileCash.mobileNumber)
                .execute("p_UpdateMobileCash");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update mobile cash ${error}`);
        }
    }

    async delete(id: number): Promise<mobileCashModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_DeleteMobileCash");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete mobile cash ${error}`);
        }
    }

    async getMobileCashBysubAccountID(subAccountID: number): Promise<mobileCashModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("subAccountID", sql.Int, subAccountID)
                .execute("p_GetmobileCashBysubAccountID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get mobile cash ${error}`);
        }
    }
}