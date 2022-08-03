import dotenv from 'dotenv';

dotenv.config();
export interface subAccount {
  ID?: number;
  mainAccountNumber: number
  subAccountName: string;
  accountNumber: string;
  pricePlanID: number;
  paymentMethodID: number;
  productTypeID: number;
  registerationDate: Date;
}
