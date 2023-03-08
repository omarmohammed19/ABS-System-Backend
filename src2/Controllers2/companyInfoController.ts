import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { CompanyInfo } from "../Models2/companyInfoModel";

dotenv.config();

export class companyInfoController{
    async index(): Promise<CompanyInfo[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetcompanyInfo]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all CompanyInfo. Error: ${err}`)
        }
    }

    async getCompanyInfoByID(id: number): Promise<CompanyInfo> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_GetcompanyInfoByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all CompanyInfo. Error: ${err}`)
        }
    }

    async create(C: CompanyInfo): Promise<CompanyInfo> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("companyName", sql.NVarChar, C.companyName)
                .execute('[dbo].[p_SavecompanyInfo]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new CompanyInfo ${C.companyName}. Error: ${err}`)
        }
    }

    async update(C: CompanyInfo): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, C.ID)
                .input("companyName", sql.NVarChar, C.companyName)
                .execute('[dbo].[p_UpdatecompanyInfo]');
            pool.close();
            return "CompanyInfo updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update CompanyInfo ${C.companyName}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("companyID", sql.BigInt, id)
                .execute('[dbo].[p_DeletecompanyInfo]');
            pool.close();
            if(result.returnValue === 0){
                return "CompanyInfo deleted successfully";
            }
            else
            {
                return "CompanyInfo not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete CompanyInfo ${id}. Error: ${err}`)
        }
    }
}