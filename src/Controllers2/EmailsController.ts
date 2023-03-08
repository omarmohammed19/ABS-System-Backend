import { emailsModel } from "../Models2/EmailsModel";
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";

dotenv.config();

export class emailsController {
    async index(): Promise<emailsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetEmails");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get emails ${error}`);
        }
    }

    async checkEmails(email: string): Promise<emailsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().input('email', sql.NVarChar, email).execute('[dbo].[p_checkEmails]');
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get the user ${error}`);
        }
    }

    async get(id: number): Promise<emailsModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetEmailsByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get email ${error}`);
        }
    }

    async add(emails: emailsModel): Promise<emailsModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("email", sql.NVarChar, emails.email)
                .input("emailTypeID", sql.Int, emails.emailTypeID)
                .input("UserInfoID", sql.Int, emails.UserInfoID)
                .input("CompanyInfoID", sql.Int, emails.CompanyInfoID)
                .input("ContactPersonID", sql.Int, emails.ContactPersonID)
                .execute("p_SaveEmails");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add email ${error}`);
        }
    }

    async update(emails: emailsModel): Promise<emailsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, emails.ID)
                .input("email", sql.NVarChar, emails.email)
                .input("emailTypeID", sql.Int, emails.emailTypeID)
                .input("UserInfoID", sql.Int, emails.UserInfoID)
                .input("CompanyInfoID", sql.Int, emails.CompanyInfoID)
                .input("ContactPersonID", sql.Int, emails.ContactPersonID)
                .execute("p_UpdateEmails");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update email ${error}`);
        }
    }

    async delete(id: number): Promise<emailsModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute("p_DeleteEmails");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete email ${error}`);
        }
    }
}