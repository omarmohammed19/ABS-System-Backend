import dotenv from "dotenv";

dotenv.config();

export interface deliveryLocationsModel {
    ID?: number,
    locationName: string,
    addressID: string,
}