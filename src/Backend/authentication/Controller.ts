import { UsersModel, Users } from './Model';

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
}
