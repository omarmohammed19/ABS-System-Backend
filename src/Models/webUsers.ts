import dotenv from 'dotenv';
dotenv.config();

export interface webUsers {
  ID?: number;
  userName: string;
  webUserPassword: string;
  Roles: number;
  subAccountID: number;
}
