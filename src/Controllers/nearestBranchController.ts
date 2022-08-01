import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { NearestBranch } from '../Models/nearestBranch';


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
                .input('brancheID', sql.Int, nb.brancheID)
                .execute("p_SavenearestBranch");
            console.log(nb);
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
                .input('brancheID', sql.Int, nb.brancheID)
                .execute("p_UpdatenearestBranch");
            pool.close();
            console.log(result);
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

}