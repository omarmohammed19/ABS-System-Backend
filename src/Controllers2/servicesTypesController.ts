import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { ServicesTypes } from '../Models2/servicesTypes';

dotenv.config();

export class ServicesTypesController {
  async getServiceTypesByID(id: number): Promise<ServicesTypes[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetservicesTypesByID]');
      pool.close();

      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get orders ${error}`);
    }
  }
  async addServicesTypes(service: ServicesTypes): Promise<ServicesTypes> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('serviceType', sql.NVarChar, service.serviceType).execute('[dbo].[p_SaveservicesTypes]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add ServicesTypes ${error}`);
    }
  }
  async getServicesTypes(): Promise<ServicesTypes[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetservicesTypes]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get orders ${error}`);
    }
  }
  async deleteServicesTypes(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeleteservicesTypes]');
      pool.close();
      if (result.returnValue === 0) {
        return 'Service type deleted successfully';
      } else {
        return 'Service type not found';
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Could not delete the service type ${error}`);
    }
  }
  async updateServicesTypes(service: ServicesTypes): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, service.ID)
        .input('serviceType', sql.NVarChar, service.serviceType)
        .execute('[dbo].[p_UpdateservicesTypes]');
      pool.close();
      return 'Service type updated successfully';
    } catch (error) {
      throw new Error(`Could not update the service type ${error}`);
    }
  }
}
