import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { ContactPersonType } from "../Models/contactPersonTypesModel";

dotenv.config();

export class contactPersonTypesController{
    async index(): Promise<ContactPersonType[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetcontactPersonTypes]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all ContactPersonType. Error: ${err}`)
        }
    }

    async getContactPersonTypeByID(id: number): Promise<ContactPersonType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_GetcontactPersonTypesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all ContactPersonType. Error: ${err}`)
        }
    }

    async create(C: ContactPersonType): Promise<ContactPersonType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("contactPersonType", sql.NVarChar, C.contactPersonType)
                .execute('[dbo].[p_SavecontactPersonTypes]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new ContactPersonType ${C.contactPersonType}. Error: ${err}`)
        }
    }

    async update(C: ContactPersonType): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, C.ID)
                .input("contactPersonType", sql.NVarChar, C.contactPersonType)
                .execute('[dbo].[p_UpdatecontactPersonTypes]');
            pool.close();
            return "Contact Person Type updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update ContactPersonType ${C.contactPersonType}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_DeletecontactPersonTypes]');
            pool.close();
            if(result.returnValue === 0){
                return "Contact Person Type deleted successfully";
            }
            else{
                return "Contact Person Type not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete ContactPersonType. Error: ${err}`)
        }
    }
}