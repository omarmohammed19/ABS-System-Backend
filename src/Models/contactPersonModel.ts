import dotenv from "dotenv";

dotenv.config();

export interface ContactPerson {
    ID?: number,
    firstName: string,
    lastName: string,
    subAccountID: number,
    contactPersonTypeID: number
}