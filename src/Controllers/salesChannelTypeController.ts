import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { SalesChannelType } from '../Models/salesChannelsType';


dotenv.config();


export class SalesChannelTypeController {

    async index(): Promise<SalesChannelType[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetsalesChannelTypes");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get SalesChannelTypes ${error}`);
        }
    }

    async addSalesChannelType(sct: SalesChannelType): Promise<SalesChannelType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('salesChannelType', sql.NVarChar, sct.salesChannelType)
                .execute("p_SavesalesChannelTypes");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add SalesChannelType ${error}`);
        }
    }

    async updateSalesChannelType(sct: SalesChannelType): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, sct.ID)
                .input('salesChannelType', sql.NVarChar, sct.salesChannelType)
                .execute("p_UpdatesalesChannelTypes");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update SalesChannelType ${error}`);
        }
    }

    async deleteSalesChannelType(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeletesalesChannelTypes");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete paymentMethods `);
            }
        } catch (error) {
            throw new Error(`Could not delete SalesChannelType ${error}`);
        }
    }

    async getSalesChannelTypeByID(id: number): Promise<SalesChannelType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetsalesChannelTypesByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get SalesChannelType ${error}`);
        }
    }
}