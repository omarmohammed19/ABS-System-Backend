import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";
import { governoratesModel } from "../Models2/GovernoratesModel";

dotenv.config();

export class governoratesController {
    async index(): Promise<governoratesModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetGovernorates");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get governorates ${error}`);
        }
    }

    async get(id: number): Promise<governoratesModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetGovernoratesByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get governorate ${error}`);
        }
    }

    async add(governorates: governoratesModel): Promise<governoratesModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("governorateName", sql.NVarChar, governorates.governorateName)
                .input("countryID", sql.Int, governorates.countryID)
                .execute("p_SaveGovernorates");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add governorate ${error}`);
        }
    }

    async update(governorates: governoratesModel): Promise<governoratesModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, governorates.ID)
                .input("governorateName", sql.NVarChar, governorates.governorateName)
                .input("countryID", sql.Int, governorates.countryID)
                .execute("p_UpdateGovernorates");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update governorate ${error}`);
        }
    }

    async delete(id: number): Promise<governoratesModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute("p_DeleteGovernorates");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete governorate ${error}`);
        }
    }
}