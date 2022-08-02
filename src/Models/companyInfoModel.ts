import dotenv from "dotenv";

dotenv.config();

export interface CompanyInfo {
    ID?: number,
    companyName: string,
}