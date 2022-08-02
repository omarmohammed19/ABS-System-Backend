import dotenv from "dotenv";

dotenv.config();

export interface BankName {
    bankNameID?: number,
    bankName: string,
}