import { UsersModel, Users } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

export class UsersController {
  async handleLogin(username: string, password: string): Promise<UsersModel | string> {
    try {
      const result = await Users.findOne({ where: { username: username } });
      return result ? result.toJSON() : 'Could not get User';
    }
    catch (err) {
      throw new Error(`Could not get User. Error: ${err}`);
    }
  }

  async handlesignin(userCred: string, password: string): Promise<UsersModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_GET_sys_UsersByCredentials] @userCred = :userCred';
        const replacements = { userCred: userCred };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
        const result = sequelize.query(query, options)
        return result as unknown as UsersModel;
      });
    }
    catch (err) {
      throw new Error(`Could not get User. Error: ${err}`);
    }
  }
}
