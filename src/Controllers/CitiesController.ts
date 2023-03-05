import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { City } from "../Models/CitiesModel";

dotenv.config();

export class CitiesController {
    async index(): Promise<City[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetCities]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Cities. Error: ${err}`)
        }
    }

    async getCityByID(id: number): Promise<City> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_GetCitiesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all Cities. Error: ${err}`)
        }
    }

    async create(C: City): Promise<City> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("cityName", sql.NVarChar, C.cityName)
                .input("governorateID", sql.BigInt, C.governorateID)
                .execute('[dbo].[p_SaveCities]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new City ${C.cityName}. Error: ${err}`)
        }
    }

    async update(C: City): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, C.ID)
                .input("cityName", sql.NVarChar, C.cityName)
                .input("governorateID", sql.BigInt, C.governorateID)
                .execute('[dbo].[p_UpdateCities]');
            pool.close();
            return "City updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update City ${C.cityName}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_DeleteCities]');
            pool.close();
            if (result.returnValue === 0) {
                return "City deleted successfully";
            }
            else {
                return "City not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete City ${id}. Error: ${err}`)
        }
    }

    async getCitiesByZoneID(id: number): Promise<City[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("zoneID", sql.Int, id)
                .execute('[dbo].[p_GetCitiesByZoneID]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Cities. Error: ${err}`)
        }
    }
}