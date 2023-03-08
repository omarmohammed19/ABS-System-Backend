import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";

dotenv.config();

export class CustomersController {

    async index(): Promise<string[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetCustomers");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get clients ${error}`);
        }
    }

    async getCustomerByAccNo(id: number): Promise<string[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("accNo", sql.Int, id)
                .execute("p_GetCustomersByAccNO");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get email ${error}`);
        }
    }

}