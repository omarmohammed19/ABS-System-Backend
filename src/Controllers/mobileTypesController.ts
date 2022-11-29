import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { MobileType } from '../Models/mobileTypes';


dotenv.config();

export class mobileTypesController {

    async index(): Promise<MobileType[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetmobileTypes");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get mobileTypes ${error}`);
        }
    }

    async addMobileType(mob: MobileType): Promise<MobileType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('mobileType', sql.NVarChar, mob.mobileType)
                .execute("p_SavemobileTypes");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add mobileType ${error}`);
        }
    }

    async updateMobileType(mt: MobileType): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, mt.ID)
                .input('mobileType', sql.NVarChar, mt.mobileType)
                .execute("p_UpdatemobileTypes");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update mobileType ${error}`);
        }
    }

    async deleteMobileType(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .execute("p_DeletemobileTypes");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete mobileType `);
            }
        } catch (error) {
            throw new Error(`Could not delete mobileType ${error}`);
        }
    }


    async getMobileType(id: number): Promise<MobileType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetmobileTypesByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get mobileType ${error}`);
        }
    }
}