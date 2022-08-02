import dotenv from "dotenv";

dotenv.config();

export interface legalPapersModel {
    ID?: number,
    companyInfoID: number,
    legalPaperTypeID: number,
    legalPaperImage: string
}