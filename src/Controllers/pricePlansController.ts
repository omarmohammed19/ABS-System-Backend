import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { PricePlan } from '../Models/pricePlans';


dotenv.config();


export class PricePlansController {

    async index(): Promise<PricePlan[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetpricePlans");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get pricePlans ${error}`);
        }
    }

    async addPricePlan(pp: PricePlan): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('fromZoneID', sql.Int, pp.fromZoneID)
                .input('toZoneID', sql.Int, pp.toZoneID)
                .input('price', sql.Int, pp.price)
                .input('pricePlanID', sql.Int, pp.pricePlanID)
                .input('numberOfShipments', sql.Int, pp.numberOfShipments)
                .input('pricePlanNameID', sql.Int, pp.pricePlanNameID)
                .execute("p_SavepricePlans");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add pricePlans ${error}`);
        }
    }

    async updatePricePlan(pp: PricePlan): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, pp.ID)
                .input('fromZoneID', sql.Int, pp.fromZoneID)
                .input('toZoneID', sql.Int, pp.toZoneID)
                .input('price', sql.Int, pp.price)
                .input('pricePlanID', sql.Int, pp.pricePlanID)
                .input('numberOfShipments', sql.Int, pp.numberOfShipments)
                .input('pricePlanNameID', sql.Int, pp.pricePlanNameID)
                .execute("p_UpdatepricePlans");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update pricePlans ${error}`);
        }
    }

    async deletePricePlan(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeletepricePlans");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete paymentMethods `);
            }
        } catch (error) {
            throw new Error(`Could not delete pricePlans ${error}`);
        }
    }

    async getPricePlanByID(id: number): Promise<PricePlan[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetpricePlansByID");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get pricePlans ${error}`);
        }
    }

}