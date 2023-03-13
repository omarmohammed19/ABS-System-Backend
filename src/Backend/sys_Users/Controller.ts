import { UsersModel, Users } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { SubAccounts } from '../cust_SubAccounts/Model';
import { Roles } from '../sys_Roles/Model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { SALT_ROUNDS, pepper } = process.env;

const getById = (ID: Number, language?: string) => {
  const lang = language === 'en' ? 'enRole' : 'arRole';
  return Users.findOne({
    where: {
      isActive: true,
      ID: ID,
    },
    include: [
      { model: SubAccounts, required: true, attributes: ['subAccountName'] },
      { model: Roles, required: true, attributes: [lang] },
    ],
    attributes: ['username', 'password', 'subAccountID', 'displayedName', 'roleID', 'avatar'],
  }) as unknown as UsersModel & {
    cust_SubAccount: {
      subAccountName: string;
    };
    sys_Role: {
      enRole: string;
      arRole: string;
    };
  };
};

export class UsersController {
  async index(language: string): Promise<UsersModel[]> {
    try {
      const lang = language === 'en' ? 'enRole' : 'arRole';
      const result = await Users.findAll({
        where: {
          isActive: true,
        },
        include: [
          { model: SubAccounts, required: true, attributes: ['subAccountName'] },
          { model: Roles, required: true, attributes: [lang] },
        ],
        attributes: ['username', 'password', 'subAccountID', 'displayedName', 'roleID', 'avatar'],
      });

      // return result.map((item: any) => item.toJSON()) as UsersModel[];
      return result.map((item: any) => ({
        username: item.username,
        password: item.password,
        subAccountName: item.cust_SubAccount.subAccountName,
        displayedName: item.displayedName,
        role: language === 'en' ? item.sys_Role.enRole : item.sys_Role.arRole,
        avatar: item.avatar,
      })) as unknown as UsersModel[];
    } catch (err) {
      throw new Error(`Could not get all Users. Error: ${err}`);
    }
  }

  async getUserById(language: string, ID: number): Promise<UsersModel | null> {
    try {
      const result = await getById(ID, language);
      if (result === null) {
        return null;
      }
      return {
        username: result.username,
        password: result.password,
        subAccountName: result.cust_SubAccount.subAccountName,
        displayedName: result.displayedName,
        role: language === 'en' ? result.sys_Role.enRole : result.sys_Role.arRole,
        avatar: result.avatar,
      } as unknown as UsersModel;
    } catch (err) {
      throw new Error(`Could not get ContactLogTypes by ID. Error: ${err}`);
    }
  }

  async create(user: UsersModel): Promise<UsersModel | string> {
    try {
      //@ts-ignore
      const hashedPassword = await bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));
      const result = await Users.create(
        {
          username: user.username,
          password: hashedPassword,
          subAccountID: user.subAccountID,
          displayedName: user.displayedName,
          roleID: user.roleID,
          avatar: user.avatar,
        },
        {
          fields: ['username', 'password', 'subAccountID', 'displayedName', 'roleID', 'avatar'],
        }
      );
      return result ? result.toJSON() : 'Could not add new Users';
    } catch (err) {
      throw new Error(`Could not add new User. Error: ${err}`);
    }
  }

  async update(user: UsersModel): Promise<UsersModel> {
    try {
      //@ts-ignore
      const hashedPassword = await bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS));
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
      const result = await getById(Number(user.ID));
      return {
        username: result.username,
        password: result.password,
        subAccountName: result.cust_SubAccount.subAccountName,
        displayedName: result.displayedName,
        enrole: result.sys_Role.enRole,
        arRole: result.sys_Role.arRole,
        avatar: result.avatar,
      } as unknown as UsersModel;
    } catch (err) {
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
