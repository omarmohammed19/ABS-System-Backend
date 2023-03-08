import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";
import { Services } from '../Models2/Services';


dotenv.config();


export class ServicesController {

    async index(): Promise<Services[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetServices");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get Services ${error}`);
        }
    }

    async addService(ser: Services): Promise<Services> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('subAccountID', sql.Int, ser.subAccountID)
                .input('serviceTypeID', sql.Int, ser.serviceTypeID)
                .execute("p_SaveServices");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add Service ${error}`);
        }
    }

    async updateService(ser: Services): Promise<Services> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, ser.ID)
                .input('subAccountID', sql.Int, ser.subAccountID)
                .input('serviceTypeID', sql.Int, ser.serviceTypeID)
                .execute("p_UpdateServices");
            pool.close();
            return result.output.result;
        } catch (error) {
            throw new Error(`Could not update Service ${error}`);
        }
    }

    async deleteService(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeleteServices");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete paymentMethods `);
            }
        } catch (error) {
            throw new Error(`Could not delete Service ${error}`);
        }
    }

    async getServiceByID(id: number): Promise<Services> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetServicesByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get Service ${error}`);
        }
    }
}