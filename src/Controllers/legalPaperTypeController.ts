import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { legalPaperTypeModel } from "../Models/legalPaperTypeModel";

dotenv.config();

export class legalPaperTypeController {
    async index(): Promise<legalPaperTypeModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetlegalPapersType");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get legal paper types ${error}`);
        }
    }

    async get(id: number): Promise<legalPaperTypeModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetLegalPapersTypeByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get legal paper type ${error}`);
        }
    }

    async add(legalPaperType: legalPaperTypeModel): Promise<legalPaperTypeModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("legalPaperType", sql.NVarChar, legalPaperType.legalPaperType)
                .execute("p_SaveLegalPapersType");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add legal paper type ${error}`);
        }
    }

    async update(legalPaperType: legalPaperTypeModel): Promise<legalPaperTypeModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, legalPaperType.ID)
                .input("legalPaperType", sql.NVarChar, legalPaperType.legalPaperType)
                .execute("p_UpdateLegalPapersType");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update legal paper type ${error}`);
        }
    }

    async delete(id: number): Promise<legalPaperTypeModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_DeleteLegalPapersType");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete legal paper type ${error}`);
        }
    }

}