import dotenv from "dotenv";

dotenv.config();

export interface governoratesModel {
    ID?: number,
    governorateName: string,
    countryID: number
}