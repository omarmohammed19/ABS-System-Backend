import { custInfoModel } from './../Models2/custInfoModel';
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";

dotenv.config();

export class custInfoController {

    async index(): Promise<custInfoModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetcustInfo");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get clients ${error}`);
        }
    }

    async get(id: number): Promise<custInfoModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetcustInfoByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get client ${error}`);
        }
    }


    async add(custInfo: custInfoModel): Promise<custInfoModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("firstName", sql.NVarChar, custInfo.firstName)
                .input("lastName", sql.NVarChar, custInfo.lastName)
                .execute("p_SavecustInfo");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add client ${error}`);
        }
    }

    async update(custInfo: custInfoModel): Promise<custInfoModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, custInfo.ID)
                .input("firstName", sql.NVarChar, custInfo.firstName)
                .input("lastName", sql.NVarChar, custInfo.lastName)
                .execute("p_UpdatecustInfo");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update client ${error}`);
        }
    }

    async delete(id: number): Promise<custInfoModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_DeletecustInfo");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete client ${error}`);
        }
    }

    async getUserInfo(id: number): Promise<custInfoModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("subAccountID", sql.Int, id)
                .execute("p_GetUserInfoBysubAccountID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get client ${error}`);
        }
    }
}