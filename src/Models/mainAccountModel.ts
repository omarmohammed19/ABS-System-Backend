import dotenv from "dotenv";

dotenv.config();

export interface mainAccountModel {
    ID?: number,
    mainAccountName: string,
    accountNumber: number,
    salesManID: number,
    custInfoID: number,
    companyInfoID: number,
    registrationDate: Date;
}