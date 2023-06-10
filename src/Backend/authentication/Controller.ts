import { UsersModel, Users } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';
import { UserRoles, UsersRolesModel } from '../sys_UserRoles/Model';

export class UsersController {
  async handleLogin(username: string, password: string): Promise<UsersModel | string> {
    try {
      const result = await Users.findOne({ where: { username: username } });
      return result ? result.toJSON() : 'Could not get User';
    } catch (err) {
      throw new Error(`Could not get User. Error: ${err}`);
    }
  }

  async handlesignin(userCred: string, password: string): Promise<UsersModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_GET_sys_UsersByCredentials] @userCred = :userCred';
        const replacements = { userCred: userCred };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
        const result = await sequelize.query(query, options);

        console.log(result);

        const roles = await UserRoles.findAll({
          attributes: ['roleID'],
          where: {
            //@ts-ignore
            userID: result[0].ID,
          },
          transaction: t, // pass transaction object to query
        });

        const rolesArray = Array.isArray(roles) ? roles : [roles]; // Convert to array if not already

        const Roles = rolesArray.map((item: any) => item.toJSON()) as UsersRolesModel[];

        return { result, Roles } as unknown as any;
      });
    } catch (err) {
      throw new Error(`Could not get User. Error: ${err}`);
    }
  }
}
