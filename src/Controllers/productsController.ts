import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { Product } from '../Models/Products';


dotenv.config();


export class ProductsController {

    async index(): Promise<Product[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetProducts");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get Products ${error}`);
        }
    }

    async addProduct(pro: Product): Promise<Product> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('productName', sql.NVarChar, pro.productName)
                .execute("p_SaveProducts");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add Product ${error}`);
        }
    }

    async updateProduct(pro: Product): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, pro.ID)
                .input('productName', sql.NVarChar, pro.productName)
                .execute("p_UpdateProducts");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update Product ${error}`);
        }
    }

    async deleteProduct(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeleteProducts");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete paymentMethods `);
            }
        } catch (error) {
            throw new Error(`Could not delete Product ${error}`);
        }
    }

    async getProductByID(id: number): Promise<Product> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetProductsByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get Product ${error}`);
        }
    }
}

