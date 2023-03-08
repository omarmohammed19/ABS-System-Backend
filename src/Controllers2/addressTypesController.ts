import { AddressType } from "../Models2/addressTypesModel";
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";

dotenv.config();

export class addressTypesController {

    async index(): Promise<AddressType[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetaddressTypes]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all AddressTypes. Error: ${err}`)
        }
    }

    async getAddressTypeByID(id: number): Promise<AddressType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("addressTypeID", sql.BigInt, id)
                .execute('[dbo].[p_GetaddressTypesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all AddressTypes. Error: ${err}`)
        }
    }

    async create(addressType: AddressType): Promise<AddressType> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("addressType", sql.NVarChar, addressType.addressType)
                .execute('[dbo].[p_SaveaddressTypes]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new AddressType ${addressType.addressType}. Error: ${err}`)
        }
    }

    async update(A: AddressType): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("addressTypeID", sql.BigInt, A.addressTypeID)
                .input("addressType", sql.NVarChar, A.addressType)
                .execute('[dbo].[p_UpdateaddressTypes]');
            pool.close();
            return "Address updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update AddressType ${A.addressTypeID}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("addressTypeID", sql.Int, id)
                .execute('[dbo].[p_DeleteaddressTypes]');
            pool.close();
            if (result.returnValue === 0) {
                return "Address deleted successfully";
            }
            else {
                return "Address not found";
            }
        }
        catch (err) {
            throw new Error(`Could not delete AddressType ${id}. Error: ${err}`)
        }
    }
}