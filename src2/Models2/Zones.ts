import dotenv from 'dotenv';
dotenv.config();

export interface Zones {
  ID?: number;
  Zone: string;
  zoneTypeID: number;
  cityID: number;
}
