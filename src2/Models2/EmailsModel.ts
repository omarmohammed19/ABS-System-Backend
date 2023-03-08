import dotenv from "dotenv";

dotenv.config();

export interface emailsModel {
    ID?: number,
    emailTypeID: number,
    UserInfoID: number,
    CompanyInfoID: number,
    ContactPersonID: number,
    email: string,
}