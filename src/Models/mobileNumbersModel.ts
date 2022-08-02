import dotenv from "dotenv";

dotenv.config();

export interface mobileNumbersModel {
    ID?: number,
    userInfoID: number,
    companyInfoID: number,
    contactPersonID: number,
    mobileNumber: string,
    mobileTypeID: number,
}