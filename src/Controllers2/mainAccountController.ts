import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";
import { mainAccountModel } from "../Models2/mainAccountModel";

dotenv.config();

export class mainAccountController {
    async index(): Promise<mainAccountModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetMainAccount");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get main accounts ${error}`);
        }
    }

    async get(id: number): Promise<mainAccountModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetMainAccountByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get main account ${error}`);
        }
    }

    async add(mainAccount: mainAccountModel): Promise<mainAccountModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("mainAccountName", sql.NVarChar, mainAccount.mainAccountName)
                .input("salesManID", sql.Int, mainAccount.salesManID)
                .input("custInfoID", sql.Int, mainAccount.custInfoID)
                .input("companyInfoID", sql.Int, mainAccount.companyInfoID)
                .input("registrationDate", sql.Date, mainAccount.registrationDate)
                .execute("p_SaveMainAccount");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add main account ${error}`);
        }
    }

    async update(mainAccount: mainAccountModel): Promise<mainAccountModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, mainAccount.ID)
                .input("mainAccountName", sql.NVarChar, mainAccount.mainAccountName)
                .input("salesManID", sql.Int, mainAccount.salesManID)
                .input("custInfoID", sql.Int, mainAccount.custInfoID)
                .input("companyInfoID", sql.Int, mainAccount.companyInfoID)
                .input("registrationDate", sql.Date, mainAccount.registrationDate)
                .execute("p_UpdateMainAccount");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update main account ${error}`);
        }
    }

    async delete(id: number): Promise<mainAccountModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_DeleteMainAccount");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete main account ${error}`);
        }
    }
}