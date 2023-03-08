import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config2/database";
import { PaymentMethod } from '../Models2/paymentMethods';


dotenv.config();


export class PaymentMethodsController {

    async index(): Promise<PaymentMethod[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .execute("p_GetpaymentMethods");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get paymentMethods ${error}`);
        }
    }

    async addPaymentMethod(pm: PaymentMethod): Promise<PaymentMethod> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('paymentMethodType', sql.NVarChar, pm.paymentMethodType)
                .execute("p_SavepaymentMethods");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add paymentMethods ${error}`);
        }
    }

    async updatePaymentMethod(pm: PaymentMethod): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, pm.ID)
                .input('paymentMethodType', sql.NVarChar, pm.paymentMethodType)
                .execute("p_UpdatepaymentMethods");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update paymentMethods ${error}`);
        }
    }

    async deletePaymentMethod(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeletepaymentMethods");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete paymentMethods `);
            }
        } catch (error) {
            throw new Error(`Could not delete paymentMethods ${error}`);
        }
    }

    async getPaymentMethodByID(id: number): Promise<PaymentMethod> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_GetpaymentMethodsByID");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not get paymentMethods ${error}`);
        }
    }

}