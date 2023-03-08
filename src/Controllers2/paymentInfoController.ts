import dotenv from 'dotenv';
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../Config/database";
import { PaymentInfo } from '../Models2/paymentInfo';


dotenv.config();


export class PaymentInfoController {


    async index(paymentMethodID: number): Promise<PaymentInfo[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('paymentMethodID', sql.Int, paymentMethodID)
                .execute("p_GetpaymentInfo");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get paymentInfo ${error}`);
        }
    }

    async addPaymentInfo(pi: PaymentInfo): Promise<PaymentInfo> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('subAccountID', sql.Int, pi.subAccountID)
                .input('mobileCashID', sql.Int, pi.mobileCashID)
                .input('walletDetailsID', sql.Int, pi.walletDetailsID)
                .input('nearestBranchID', sql.Int, pi.nearestBranchID)
                .input('bankDetailID', sql.Int, pi.bankDetailID)
                .execute("p_SavepaymentInfo");
            pool.close();
            return result.recordset[0];
        } catch (error) {
            throw new Error(`Could not add paymentInfo ${error}`);
        }
    }

    async updatePaymentInfo(pi: PaymentInfo): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, pi.ID)
                .input('subAccountID', sql.Int, pi.subAccountID)
                .input('mobileCashID', sql.Int, pi.mobileCashID)
                .input('walletDetailsID', sql.Int, pi.walletDetailsID)
                .input('nearestBranchID', sql.Int, pi.nearestBranchID)
                .input('bankDetailID', sql.Int, pi.bankDetailID)
                .execute("p_UpdatepaymentInfo");
            pool.close();
            return "Updated";
        } catch (error) {
            throw new Error(`Could not update paymentInfo ${error}`);
        }
    }

    async deletePaymentInfo(id: number): Promise<string> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .execute("p_DeletepaymentInfo");
            pool.close();
            if (result.returnValue === 0) {

                return "Deleted";
            }
            else {
                throw new Error(`Could not delete PaymentInfo `);
            }
        } catch (error) {
            throw new Error(`Could not delete paymentInfo ${error}`);
        }
    }

    async getPaymentInfoByID(id: number, paymentMethodID: number): Promise<PaymentInfo[]> {
        try {
            //@ts-ignore
            const pool = await new sql.ConnectionPool(sqlConfig).connect();
            const result = await pool.request()
                .input('ID', sql.BigInt, id)
                .input('paymentMethodID', sql.Int, paymentMethodID)
                .execute("p_GetpaymentInfoByID");
            pool.close();
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get paymentInfo ${error}`);
        }
    }


}


