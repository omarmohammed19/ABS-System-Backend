import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { Country } from "../Models2/CountriesModel";

dotenv.config();

export class CountriesController{
    async index(): Promise<Country[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetCountries]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Countries. Error: ${err}`)
        }
    }

    async getCountryByID(id: number): Promise<Country> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_GetCountriesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all Countries. Error: ${err}`)
        }
    }

    async create(C: Country): Promise<Country> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("countryName", sql.NVarChar, C.countryName)
                .execute('[dbo].[p_SaveCountries]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new Country ${C.countryName}. Error: ${err}`)
        }
    }

    async update(C: Country): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, C.ID)
                .input("countryName", sql.NVarChar, C.countryName)
                .execute('[dbo].[p_UpdateCountries]');
            pool.close();
            return "Country updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update Country ${C.countryName}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_DeleteCountries]');
            pool.close();
            if(result.returnValue === 0){
                return "Country deleted successfully";
            }
            else{
                return "Country not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete Country. Error: ${err}`)
        }
    }
}
