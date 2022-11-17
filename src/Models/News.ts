import dotenv from "dotenv";

dotenv.config();

export interface News {
    ID?: number,
    News: string,
    Active: boolean
}


