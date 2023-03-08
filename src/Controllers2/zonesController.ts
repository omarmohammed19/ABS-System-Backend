import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { Zones } from '../Models2/Zones';

dotenv.config();

export class ZonesController {
  async getZoneByID(id: number): Promise<Zones[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetZonesByID]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the zone ${error}`);
    }
  }
  async addZone(zone: Zones): Promise<Zones> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('Zone', sql.NVarChar, zone.Zone)
        .input('zoneTypeID', sql.Int, zone.zoneTypeID)
        .input('cityID', sql.Int, zone.cityID)
        .execute('[dbo].[p_SaveZones]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add a new zone ${error}`);
    }
  }
  async getZones(): Promise<Zones[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetZones]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the Zones ${error}`);
    }
  }
  async deleteZone(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeleteZones]');
      pool.close();
      if (result.returnValue === 0) {
        return 'The zone deleted successfully';
      } else {
        return 'The zone could not be deleted';
      }
    } catch (error) {
      throw new Error(`Could not delete the zone ${error}`);
    }
  }
  async updateZone(zone: Zones): Promise<Zones> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, zone.ID)
        .input('Zone', sql.NVarChar, zone.Zone)
        .input('zoneTypeID', sql.Int, zone.zoneTypeID)
        .input('cityID', sql.Int, zone.cityID)
        .execute('[dbo].[p_UpdateZones]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not update the zone ${error}`);
    }
  }
}
