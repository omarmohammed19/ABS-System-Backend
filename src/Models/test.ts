
import dotenv from "dotenv";
import * as sql from "mssql/msnodesqlv8";
import { sqlConfig } from "../database";

dotenv.config();


export type t1 = {
    id?: number,
    name: string,
    mobile: number,
    fingerprint: number,
    salary: number
}

// const sqlConfig = {
//     user: 'sa',
//     password: 'Admin$ABS2022',
//     database: 'ABS-System',
//     server: '192.168.1.43',
//     driver: 'msnodesqlv8',
// }

export class Test {
    async index(): Promise<t1[]> {
        try {
            //@ts-ignore
            await sql.connect(sqlConfig);
            const result = await sql.query`SELECT * FROM Addresses`;
            return result.recordset;
        } catch (error) {
            throw new Error(`Could not get orders ${error}`);
        }
    }
}

