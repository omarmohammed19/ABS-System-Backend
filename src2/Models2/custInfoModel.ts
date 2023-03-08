import dotenv from "dotenv";

dotenv.config();

export interface custInfoModel {
    ID?: number,
    firstName: string,
    lastName: string,
}