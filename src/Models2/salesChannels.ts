import dotenv from 'dotenv';


dotenv.config();


export interface SalesChannel {
    ID?: number,
    salesChannelName: string,
    companyInfoID: number,
    salesChannelTypeID: number,
    salesChannelURL: string
}