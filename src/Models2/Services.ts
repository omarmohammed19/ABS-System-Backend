import dotenv from 'dotenv';


dotenv.config();


export interface Services {
    ID?: number,
    subAccountID: number,
    serviceTypeID: number
}