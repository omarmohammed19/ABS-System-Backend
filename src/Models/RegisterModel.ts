import { CompanyInfo } from './companyInfoModel';
import dotenv from 'dotenv';


dotenv.config();

export interface Register {

    custFirstName: string,
    custLastName: string,
    companyName: string,
    mainAccountName: string,
    mainAccountNumber: number,
    salesManID: number,
    pricePlanID: number,
    paymentMethodID: number,
    productTypeID: number,
    contactFirstName: string,
    contactLastName: string,
    subAccountID: number,
    contactPersonTypeID: number,
    contactPersonID: number,



}