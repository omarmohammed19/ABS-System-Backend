import dotenv from "dotenv";

dotenv.config();

export interface City {
    ID?: number,
    cityName: string,
    governorateID: number,
}