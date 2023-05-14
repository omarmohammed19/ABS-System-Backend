import { UsersModel, Users } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Transaction } from 'sequelize';
import Sequelize from 'sequelize';
import { sequelize } from '../../Config/database';

dotenv.config();
const { SALT_ROUNDS, pepper } = process.env;

const getById = async (t: Transaction, ID: Number, language?: string): Promise<UsersModel> => {
  console.log(ID);
  
  const query = 'EXEC [dbo].[p_GET_sys_Users] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as UsersModel;
};
const GetPersonalInfoById = async (t: Transaction, ID: Number): Promise<UsersModel> => {  
  const query = 'EXEC [dbo].[p_GET_sys_Users] @Method = :Method, @ID = :ID';
  const replacements = { Method: 'GET_Personal_Info', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as UsersModel;
};
export class UsersController {
  async indexClients(language: string, isActive: number, limit: number): Promise<UsersModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_sys_Users] @language = :language, @Method = :Method , @isActive = :isActive, @limit = :limit';
      const replacements = { language: language, Method: 'GET_Clients', isActive: isActive, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as UsersModel[];
    } catch (err) {
      throw new Error(`Could not get all Users. Error: ${err}`);
    }
  }

  async indexEmployees(language: string, isActive: number, limit: number): Promise<UsersModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_sys_Users] @language = :language, @Method = :Method , @isActive = :isActive, @limit = :limit';
      const replacements = { language: language, Method: 'GET_Employees', isActive: isActive, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as UsersModel[];
    } catch (err) {
      throw new Error(`Could not get all Users. Error: ${err}`);
    }
  }

  async getUserById(language: string, ID: number): Promise<UsersModel | null> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = await getById(t, ID, language);

        return result;
      });
    } catch (err) {
      throw new Error(`Could not get User by ID. Error: ${err}`);
    }
  }

  async getPersonalInfoById(ID: number): Promise<UsersModel | null> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = await GetPersonalInfoById(t, ID);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get User by ID. Error: ${err}`);
    }
  }

  async create(user: UsersModel): Promise<UsersModel | string> {
    try {
      //@ts-ignore
      const hashedPassword = bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));
      const result = await Users.create({
        username: user.username,
        password: hashedPassword,
        subAccountID: user.subAccountID,
        displayedName: user.displayedName,
        roleID: user.roleID,
        avatar: user.avatar,
      });
      return result ? result.toJSON() : 'Could not add new Users';
    } catch (err) {
      throw new Error(`Could not add new User. Error: ${err}`);
    }
  }

  async update(user: UsersModel, language: string): Promise<UsersModel> {
    try {
      return await sequelize.transaction(async (t) => {
        //@ts-ignore
        const hashedPassword = bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));

        await Users.update(
          {
            username: user.username,
            password: hashedPassword,
            subAccountID: user.subAccountID,
            displayedName: user.displayedName,
            roleID: user.roleID,
            avatar: user.avatar,
          },
          {
            where: {
              ID: user.ID,
            },
          }
        );
        const result = await getById(t, Number(user.ID), language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update User. Error: ${err}`);
    }
  }

  async changePassword(user: UsersModel, password: string): Promise<any> {
    try {
      await sequelize.transaction(async (t) => {
        const oldPassword: any = await Users.findOne({ where: { ID: user.ID }, attributes: ['password'], transaction: t });

        if (bcrypt.compareSync(password + pepper, oldPassword.password)) {
          //@ts-ignore
          const hashedPassword = bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));

          await Users.update(
            {
              password: hashedPassword,
            },
            {
              where: {
                ID: user.ID,
              },
            }
          );
          const result = await getById(t, Number(user.ID));
          return result;
        }
        return 'Old Password is incorrect';
      });
    } catch (err) {
      console.log(err);

      throw new Error(`Could not update User. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<UsersModel>(Users, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Users. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<UsersModel>(Users, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Users. Error: ${err}`);
    }
  }
}
