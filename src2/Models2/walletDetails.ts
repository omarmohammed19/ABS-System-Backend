import dotenv from 'dotenv';
dotenv.config();

export interface walletDetails {
  ID?: number;
  walletNumber: string;
  mobileNumber: string;
}
