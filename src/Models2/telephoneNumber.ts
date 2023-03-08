import dotenv from 'dotenv';
dotenv.config();

export interface telephoneNumber {
  ID?: number;
  telephoneNumber: string;
  userInfoID: number;
  companyInfoID: number;
  contactPersonID: number;
  telephoneTypeID: number;
}
