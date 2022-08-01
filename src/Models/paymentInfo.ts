import dotenv from "dotenv";


dotenv.config();


export interface PaymentInfo {
    ID?: number,
    subAccountID: number,
    mobileCashID: number,
    walletDetailsID: number,
    nearestBranchID: number,
    bankDetailID: number
}