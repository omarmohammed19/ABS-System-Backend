import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { emailTypesModel } from '../Models2/emailTypesModel';

dotenv.config();

export class emailTypesController {

    async index(): Promise<emailTypesModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetEmailTypes");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get email types ${error}`);
        }
    }

    async get(id: number): Promise<emailTypesModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetEmailTypesByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get email type ${error}`);
        }
    }

    async add(emailTypes: emailTypesModel): Promise<emailTypesModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("emailType", sql.NVarChar, emailTypes.emailType)
                .execute("p_SaveEmailTypes");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add email type ${error}`);
        }
    }

    async update(emailTypes: emailTypesModel): Promise<emailTypesModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, emailTypes.ID)
                .input("emailType", sql.NVarChar, emailTypes.emailType)
                .execute("p_UpdateEmailTypes");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update email type ${error}`);
        }
    }
    async delete(id: number): Promise<emailTypesModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute("p_DeleteEmailTypes");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete email type ${error}`);
        }
    }
}
