import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import { webUsers } from '../Models2/webUsers';
import bcrypt from "bcrypt";

dotenv.config();
const {
  SALT_ROUNDS,
  pepper
} = process.env

export class webUsersController {
  async getWebUsersByID(id: number): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetwebUsersByID]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }
  }

  async addWebUser(user: webUsers): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('userName', sql.NVarChar, user.userName)
        .input('webUserPassword', sql.NVarChar, user.webUserPassword)
        .execute('[dbo].[p_SavewebUsers]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not add a new user ${error}`);
    }
  }
  async getwebUsers(): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().execute('[dbo].[p_GetwebUsers]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the Users ${error}`);
    }
  }
  async deleteWebUser(id: number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_DeletewebUsers]');
      pool.close();
      if (result.returnValue === 0) {
        return 'The user deleted successfully';
      } else {
        return 'The user could not be deleted';
      }
    } catch (error) {
      throw new Error(`Could not delete the user ${error}`);
    }
  }
  async updateWebUser(user: webUsers): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, user.ID)
        .input('userName', sql.NVarChar, user.userName)
        .input('webUserPassword', sql.NVarChar, user.webUserPassword)
        .input('Roles', sql.Int, user.Roles)
        .execute('[dbo].[p_UpdatewebUsers]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not update the user ${error}`);
    }
  }

  async activateUser(id: Number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('subAccountID', sql.BigInt, id)
        .input('isEnabled', sql.Bit, 1)
        .execute('[dbo].[p_ActivatewebUsers]');
      pool.close();
      return "User Confirmed Successfully";
    } catch (error) {
      throw new Error(`Could not confirm the user ${error}`);
    }
  }

  async deactivateUser(id: Number): Promise<string> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('subAccountID', sql.BigInt, id)
        .input('isEnabled', sql.Bit, 0)
        .execute('[dbo].[p_ActivatewebUsers]');
      pool.close();
      return "User Deactivated Successfully";
    } catch (error) {
      throw new Error(`Could not deactivate the user ${error}`);
    }
  }

  async checkUsername(username: string): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('userName', sql.NVarChar, username).execute('[dbo].[p_checkUsername]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }
  }

  async getRolesByID(id: number): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetRolesByID]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }
  }

  async getMembersBysubAccountID(id: number): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('subaccountID', sql.Int, id).execute('[dbo].[p_GetMembersBysubaccountID]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }
  }

  async addNewMember(user: webUsers): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const hashedPassword = await bcrypt.hashSync(user.webUserPassword + pepper, parseInt(SALT_ROUNDS));
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('subAccountID', sql.Int, user.subAccountID)
        .input('userName', sql.NVarChar, user.userName)
        .input('webUserPassword', sql.NVarChar, hashedPassword)
        .input('Roles', sql.Int, user.Roles)
        .execute('[dbo].[p_SaveNewMember]');
      pool.close();
      return result.recordset;
    } catch (error) {
      console.log(error);
      throw new Error(`Could not add a new user ${error}`);
    }
  }

  async updateImage(user: webUsers): Promise<webUsers[]> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, user.ID)
        .input('Avatar', sql.NVarChar, user.Avatar)
        .execute('[dbo].[p_UpdatewebUsersImage]');
      pool.close();
      return result.recordset;
    } catch (error) {
      throw new Error(`Could not update the user ${error}`);
    }
  }

  async getPasswordByID(id: number): Promise<webUsers> {
    try {
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool.request().input('ID', sql.BigInt, id).execute('[dbo].[p_GetWebUserPassword]');
      pool.close();
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Could not get the user ${error}`);
    }

  }
  async updatePassword(user: webUsers): Promise<string> {
    try {
      //@ts-ignore
      const hashedPassword = await bcrypt.hashSync(user.webUserPassword + pepper, parseInt(SALT_ROUNDS));
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('ID', sql.BigInt, user.ID)
        .input('webUserPassword', sql.NVarChar, hashedPassword)
        .execute('[dbo].[p_UpdatewebUsersPassword]');
      pool.close();
      return "Password Updated Successfully";
    } catch (error) {
      throw new Error(`Could not update the user ${error}`);
    }
  }
}
