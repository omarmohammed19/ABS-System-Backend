import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { Branch } from "../Models2/BranchesModel";

dotenv.config();

export class BranchesController {
    async index(): Promise<Branch[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetBranches]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Branches. Error: ${err}`)
        }
    }

    async getBranchByID(id: number): Promise<Branch> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("branchID", sql.BigInt, id)
                .execute('[dbo].[p_GetBranchesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all Branches. Error: ${err}`)
        }
    }

    async create(B: Branch): Promise<Branch> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("branchName", sql.NVarChar, B.branchName)
                .execute('[dbo].[p_SaveBranches]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new Branch ${B.branchName}. Error: ${err}`)
        }
    }

    async update(B: Branch): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("branchID", sql.BigInt, B.branchID)
                .input("branchName", sql.NVarChar, B.branchName)
                .execute('[dbo].[p_UpdateBranches]');
            pool.close();
            return "Branch updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update Branch ${B.branchName}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("branchID", sql.BigInt, id)
                .execute('[dbo].[p_DeleteBranches]');
            pool.close();
            if(result.returnValue === 0) {
                return "Branch deleted successfully";
            }
            else{
                return "Branch not found";
            }

        }
        catch (err) {
            throw new Error(`Could not delete Branch. Error: ${err}`)
        }
    }
}