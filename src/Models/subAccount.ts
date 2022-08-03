import dotenv from 'dotenv';

dotenv.config();
export interface subAccount {
  ID?: number;
  subAccountName: string;
  accountNumber: number;
  pricePlanID: number;
  paymentMethodID: number;
  productTypeID: number;
  registerationDate: Date;
}
