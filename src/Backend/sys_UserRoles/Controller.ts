import { UsersRolesModel, UserRoles } from './Model';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import { sequelize } from '../../Config/database';

dotenv.config();

export class UserRolesController {
  async postRoles(ID: Number, ROLES: String): Promise<UsersRolesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_POST_sys_UserRoles]  @userID = :ID , @RoleIDs = :ROLES ';
        const replacements = { ID: ID, ROLES: ROLES };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.INSERT, transaction: t };
        const result = await sequelize.query(query, options);
        return result as unknown as UsersRolesModel;
      });
    } catch (err) {
      throw new Error(`Could not post Roles. Error: ${err}`);
    }
  }
}
