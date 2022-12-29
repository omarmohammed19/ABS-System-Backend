import { Address } from "../Models/AddressesModel";
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";

dotenv.config();

export class AddressesController {

    async index(): Promise<Address[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute('[dbo].[p_GetAddresses]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Addresses. Error: ${err}`)
        }
    }

    async getAddressByID(id: number): Promise<Address> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.Int, id)
                .execute('[dbo].[p_GetAddressesByID]');
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not get all Addresses. Error: ${err}`)
        }
    }

    async create(address: Address): Promise<Address> {
        try {

            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("addressTypeID", sql.Int, address.addressTypeID)
                .input("subAccountID", sql.Int, address.subAccountID)
                .input("streetName", sql.NVarChar, address.streetName)
                .input("apartmentNumber", sql.Int, address.apartmentNumber)
                .input("floorNumber", sql.Int, address.floorNumber)
                .input("buildingNumber", sql.Int, address.buildingNumber)
                .input("cityID", sql.Int, address.cityID)
                .input("postalCode", sql.Int, address.postalCode)
                .execute('[dbo].[p_SaveAddresses]');
            pool.close();
            return result.recordset[0];
        }
        catch (err) {
            throw new Error(`Could not add new Address ${address.ID}. Error: ${err}`)
        }
    }

    async update(A: Address): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("ID", sql.BigInt, A.ID)
                .input("addressTypeID", sql.Int, A.addressTypeID)
                .input("subAccountID", sql.Int, A.subAccountID)
                .input("streetName", sql.NVarChar, A.streetName)
                .input("apartmentNumber", sql.Int, A.apartmentNumber)
                .input("floorNumber", sql.Int, A.floorNumber)
                .input("buildingNumber", sql.Int, A.buildingNumber)
                .input("cityID", sql.Int, A.cityID)
                .input("postalCode", sql.Int, A.postalCode)
                .execute('[dbo].[p_UpdateAddresses]');
            return "Address updated successfully";
        }
        catch (err) {
            throw new Error(`Could not update Address ${A.ID}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await await pool.request()
                .input("ID", sql.BigInt, id)
                .execute('[dbo].[p_DeleteAddresses]');
            if (result.returnValue === 0) {
                return "Address deleted successfully";
            }
            else {
                return "Address not found";
            }

        }
        catch (err) {
            throw new Error(`Could not delete Address ${id}. Error: ${err}`)
        }
    }

    async getBusinessLocations(id: number): Promise<Address[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input("subAccountID", sql.Int, id)
                .execute('[dbo].[p_GetBusinessLoactionsBysubAccountID]');
            return result.recordset;
        }
        catch (err) {
            throw new Error(`Could not get all Addresses. Error: ${err}`)
        }
    }

}

