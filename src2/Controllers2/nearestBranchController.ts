import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { NearestBranch } from '../Models2/nearestBranch';


dotenv.config();


export class NearestBranchController {

    async index(): Promise<NearestBranch[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetnearestBranch");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get nearestBranch ${error}`);
        }
    }

    async addNearestBranch(nb: NearestBranch): Promise<NearestBranch> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('branchID', sql.Int, nb.branchID)
                .execute("p_SavenearestBranch");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add nearestBranch ${error}`);
        }
    }

    async updateNearestBranch(nb: NearestBranch): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, nb.ID)
                .input('branchID', sql.Int, nb.branchID)
                .execute("p_UpdatenearestBranch");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update nearestBranch ${error}`);
        }
    }

    async deleteNearestBranch(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .execute("p_DeletenearestBranch");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete nearestBranch `);
            }
        } catch (error) {
            throw new Error(`Could not delete nearestBranch ${error}`);
        }
    }

    async getNearestBranch(id: number): Promise<NearestBranch> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.Int, id)
                .execute("p_GetnearestBranchByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get nearestBranch ${error}`);
        }
    }

    async getNearestBranchBysubAccountID(subAccountID: number): Promise<NearestBranch> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('subAccountID', sql.Int, subAccountID)
                .execute("p_GetnearestBranchBysubAccountID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get nearestBranch ${error}`);
        }
    }

}