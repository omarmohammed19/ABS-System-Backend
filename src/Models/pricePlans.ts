import dotenv from 'dotenv';

dotenv.config();

export interface PricePlan {
  ID?: number;
  fromZoneID: number;
  toZoneID: number;
  price: number;
  pricePlanID: number;
}
