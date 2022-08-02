import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { SalesChannel } from '../Models/salesChannels';


dotenv.config();


export class SalesChannelsController {

    async index(): Promise<SalesChannel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetsalesChannels");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get SalesChannels ${error}`);
        }
    }

    async addSalesChannel(sc: SalesChannel): Promise<SalesChannel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('salesChannelName', sql.NVarChar, sc.salesChannelName)
                .input('companyInfoID', sql.Int, sc.companyInfoID)
                .input('salesChannelTypeID', sql.Int, sc.salesChannelTypeID)
                .input('salesChannelURL', sql.NVarChar, sc.salesChannelURL)
                .execute("p_SavesalesChannels");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add SalesChannel ${error}`);
        }
    }

    async updateSalesChannel(sc: SalesChannel): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, sc.ID)
                .input('salesChannelName', sql.NVarChar, sc.salesChannelName)
                .input('companyInfoID', sql.Int, sc.companyInfoID)
                .input('salesChannelTypeID', sql.Int, sc.salesChannelTypeID)
                .input('salesChannelURL', sql.NVarChar, sc.salesChannelURL)
                .execute("p_UpdatesalesChannels");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update SalesChannel ${error}`);
        }
    }

    async deleteSalesChannel(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeletesalesChannels");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete paymentMethods `);
            }
        } catch (error) {
            throw new Error(`Could not delete SalesChannel ${error}`);
        }
    }

    async getSalesChannelByID(id: number): Promise<SalesChannel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetsalesChannelsByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get SalesChannel ${error}`);
        }
    }
}