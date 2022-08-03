import dotenv from "dotenv";

dotenv.config();

export interface BankDetails {
    bankDetailID?: number,
    accountHolderName: string,
    accountNumber: string,
    bankNameID: number,
    IBAN: string,
    swiftCode: string,
}