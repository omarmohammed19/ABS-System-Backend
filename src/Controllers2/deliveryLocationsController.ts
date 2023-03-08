import { deliveryLocationsModel } from './../Models2/deliveryLocationsModel';
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";

dotenv.config();

export class deliveryLocationsController {

    async index(): Promise<deliveryLocationsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetdeliveryLocations");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get clients ${error}`);
        }
    }

    async get(id: number): Promise<deliveryLocationsModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetdeliveryLocationsByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get client ${error}`);
        }
    }

    async add(deliveryLocations: deliveryLocationsModel): Promise<deliveryLocationsModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("locationName", sql.NVarChar, deliveryLocations.locationName)
                .input("addressID", sql.NVarChar, deliveryLocations.addressID)
                .execute("p_SavedeliveryLocations");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add client ${error}`);
        }
    }

    async update(deliveryLocations: deliveryLocationsModel): Promise<deliveryLocationsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, deliveryLocations.ID)
                .input("locationName", sql.NVarChar, deliveryLocations.locationName)
                .input("addressID", sql.NVarChar, deliveryLocations.addressID)
                .execute("p_UpdatedeliveryLocations");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update client ${error}`);
        }

    }

    async delete(id: number): Promise<deliveryLocationsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute("p_DeletedeliveryLocations");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete client ${error}`);
        }
    }
}