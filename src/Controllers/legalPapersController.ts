import { legalPapersModel } from './../Models/legalPapersModel';
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";

dotenv.config();

export class legalPapersController {

    async index(): Promise<legalPapersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetLegalPapers");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get legal papers ${error}`);
        }
    }

    async get(id: number): Promise<legalPapersModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetLegalPapersByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get legal paper ${error}`);
        }
    }

    async add(legalPapers: legalPapersModel): Promise<legalPapersModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("companyInfoID", sql.NVarChar, legalPapers.companyInfoID)
                .input("legalPaperTypeID", sql.Int, legalPapers.legalPaperTypeID)
                .input("legalPaperImage", sql.NVarChar, legalPapers.legalPaperImage)
                .execute("p_SaveLegalPapers");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add legal paper ${error}`);
        }
    }

    async update(legalPapers: legalPapersModel): Promise<legalPapersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, legalPapers.ID)
                .input("companyInfoID", sql.NVarChar, legalPapers.companyInfoID)
                .input("legalPaperTypeID", sql.Int, legalPapers.legalPaperTypeID)
                .input("legalPaperImage", sql.NVarChar, legalPapers.legalPaperImage)
                .execute("p_UpdateLegalPapers");
            return result.recordset;
        }
        catch (error) {

            throw new Error(`Could not update legal paper ${error}`);
        }
    }
    async delete(id: number): Promise<legalPapersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute("p_DeleteLegalPapers");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete legal paper ${error}`);
        }
    }
}
