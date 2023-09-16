import { UsersRolesModel, UserRoles } from './Model';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import { sequelize } from '../../Config/database';

dotenv.config();

const getRolesByUserID = async (ID: Number): Promise<UsersRolesModel[]> => {
  try {
    const query = 'EXEC [dbo].[p_GET_sys_UserRoles] @Method = :Method, @userID = :ID';
    const replacements = { Method: 'GET_ByUserID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
    const result = await sequelize.query(query, options);
    return result as unknown as UsersRolesModel[];
  } catch (err) {
    throw new Error(`Could not get Roles by User ID. Error: ${err}`);
  }
};

export class UserRolesController {
  async postRoles(ID: Number, ROLES: String[]): Promise<UsersRolesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_POST_sys_UserRoles]  @userID = :ID , @RoleIDs = :ROLES ';
        const replacements = { ID: ID, ROLES: ROLES };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.INSERT, transaction: t };
        const result = await sequelize.query(query, options);
        return result as unknown as UsersRolesModel;
      });
    } catch (err) {
      console.log(err);
      throw new Error(`Could not post Roles. Error: ${err}`);
    }
  }

  async deActivateRoles(ID: Number, ROLES: String): Promise<UsersRolesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_deActivate_sys_UserRoles]  @userID = :ID , @RoleIDs = :ROLES ';
        const replacements = { ID: ID, ROLES: ROLES };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.UPDATE, transaction: t };
        const result = await sequelize.query(query, options);
        return result as unknown as UsersRolesModel;
      });
    } catch (err) {
      throw new Error(`Could not post Roles. Error: ${err}`);
    }
  }



  //get all roles for specific user
  async getRolesByUserID(ID: Number): Promise<UsersRolesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getRolesByUserID(ID);
        return result;
      }
      );
    } catch (err) {
      throw new Error(`Could not get Roles by User ID. Error: ${err}`);
    }

  }
}
