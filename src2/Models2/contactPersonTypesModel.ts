import dotenv from "dotenv";

dotenv.config();

export interface ContactPersonType{
    ID?: number,
    contactPersonType: string,
}