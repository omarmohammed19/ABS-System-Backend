import { mobileNumbersModel } from './../Models2/mobileNumbersModel';
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";

dotenv.config();

export class mobileNumberController {
    async index(): Promise<mobileNumbersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetMobileNumbers");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not get mobile numbers ${error}`);
        }
    }

    async checkMobiles(mobile: string): Promise<mobileNumbersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request().input('mobile', sql.NVarChar, mobile).execute('[dbo].[p_checkMobiles]');
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get the user ${error}`);
        }
    }

    async get(id: number): Promise<mobileNumbersModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_GetMobileNumbersByID");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not get mobile number ${error}`);
        }
    }

    async add(mobileNumber: mobileNumbersModel): Promise<mobileNumbersModel> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("userInfoID", sql.NVarChar, mobileNumber.userInfoID)
                .input("companyInfoID", sql.NVarChar, mobileNumber.companyInfoID)
                .input("contactPersonID", sql.NVarChar, mobileNumber.contactPersonID)
                .input("mobileNumber", sql.NVarChar, mobileNumber.mobileNumber)
                .input("mobileTypeID", sql.NVarChar, mobileNumber.mobileTypeID)
                .execute("p_SaveMobileNumbers");
            return result.recordset[0];
        }
        catch (error) {
            throw new Error(`Could not add mobile number ${error}`);
        }
    }

    async update(mobileNumber: mobileNumbersModel): Promise<mobileNumbersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, mobileNumber.ID)
                .input("userInfoID", sql.NVarChar, mobileNumber.userInfoID)
                .input("companyInfoID", sql.NVarChar, mobileNumber.companyInfoID)
                .input("contactPersonID", sql.NVarChar, mobileNumber.contactPersonID)
                .input("mobileNumber", sql.NVarChar, mobileNumber.mobileNumber)
                .input("mobileTypeID", sql.NVarChar, mobileNumber.mobileTypeID)
                .execute("p_UpdateMobileNumbers");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not update mobile number ${error}`);
        }
    }

    async delete(id: number): Promise<mobileNumbersModel[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute("p_DeleteMobileNumbers");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Could not delete mobile number ${error}`);
        }
    }
}
