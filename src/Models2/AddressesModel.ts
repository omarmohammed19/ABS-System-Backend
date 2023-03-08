import dotenv from "dotenv";

dotenv.config();

export interface Address {
    ID?: number,
    addressTypeID: number,
    subAccountID: number,
    streetName: string,
    apartmentNumber: number,
    floorNumber: number,
    buildingNumber: number,
    cityID: number,
    postalCode: number
}


