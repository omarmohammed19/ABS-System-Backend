import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";
import { ContactPerson } from "../Models2/contactPersonModel";

dotenv.config();

export class contactPersonController {
    async index(): Promise<ContactPerson[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetcontactPerson]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all ContactPerson. Error: ${err}`)
        }
    }

    async getContactPersonByID(id: number): Promise<ContactPerson> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_GetcontactPersonByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all ContactPerson. Error: ${err}`)
        }
    }

    async create(C: ContactPerson): Promise<ContactPerson> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("firstName", sql.NVarChar, C.firstName)
                .input("lastName", sql.NVarChar, C.lastName)
                .input("subAccountID", sql.BigInt, C.subAccountID)
                .input("contactPersonTypeID", sql.BigInt, C.contactPersonTypeID)
                .execute('[dbo].[p_SavecontactPerson]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new ContactPerson ${C.firstName}. Error: ${err}`)
        }
    }

    async update(C: ContactPerson): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, C.ID)
                .input("firstName", sql.NVarChar, C.firstName)
                .input("lastName", sql.NVarChar, C.lastName)
                .input("subAccountID", sql.BigInt, C.subAccountID)
                .input("contactPersonTypeID", sql.BigInt, C.contactPersonTypeID)
                .execute('[dbo].[p_UpdatecontactPerson]');
            pool.close();
            return "ContactPerson updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update ContactPerson ${C.firstName}. Error: ${err}`)
        }
    }

async delete(id: number): Promise<string> {
    try {
        //@ts-ignore
        const pool = await new sql.ConnectionPool(sqlConfig).connect();
        const result = await pool.request()
            .input("ID", sql.BigInt, id)
            .execute('[dbo].[p_DeletecontactPerson]');
        pool.close();
        if(result.returnValue === 0) {
            return "ContactPerson deleted successfully";
        }
        else{
            return "ContactPerson not found";
        }
    }
    catch (err) {
        throw new Error(`Could not delete ContactPerson ${id}. Error: ${err}`)
    }
}
}