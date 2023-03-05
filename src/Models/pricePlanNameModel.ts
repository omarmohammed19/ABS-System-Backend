import dotenv from 'dotenv';

dotenv.config();

export interface pricePlanNameModel {
  ID?: number;
  Name: string;
  pricePlanID: number;
  numberOfShipments: number;
}
