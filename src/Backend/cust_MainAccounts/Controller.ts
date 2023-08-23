import { MainAccountsModel, MainAccounts } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

// Get all Main Accounts using sequelize not stored procedure
const getAllMainAccounts = async (t: Transaction) => {
  return MainAccounts.findAll({
    attributes: ['ID', 'mainAccountName'],
    where: {
      isActive: true,
    },
    transaction: t,
  });
};

const getById = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_MainAccounts] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as MainAccountsModel;
};

const getByUserId = async (userID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_MainAccounts] @language = :language, @Method = :Method, @userID = :userID';
  const replacements = { language: language, Method: 'GET_ByUserID', userID: userID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as MainAccountsModel;
};

const getSubAccountByMainAccountID = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_MainAccounts] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_SubAccount', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as MainAccountsModel;
};

const getSubAccountForMultipleMainAccountID = async (IDs: string, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_MainAccounts] @language = :language, @Method = :Method, @IDs = :IDs';
  const replacements = { language: language, Method: 'GET_SubAccountForMultipleMain', IDs: IDs };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as MainAccountsModel;
};

const getSubAccountConcatForMainAccountIDs = async (IDs: string, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_MainAccounts] @language = :language, @Method = :Method, @IDs = :IDs';
  const replacements = { language: language, Method: 'GET_SubAccountsConcatenatedByMain', IDs: IDs };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as MainAccountsModel;
};

// get main Accounts by clientTypeID using sequelize
const getMainAccountByClientTypeID = (clientTypeID: number, t: Transaction, language?: string) => {
  return MainAccounts.findAll({
    attributes: ['ID', 'mainAccountName'],
    where: {
      clientTypeID: clientTypeID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class MainAccountsController {
  async index(language: string, isActive: number, limit: number): Promise<MainAccountsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_MainAccounts] @language = :language, @Method = :Method, @isActive = :isActive, @limit = :limit';
      const replacements = { language: language, Method: 'GET', isActive: isActive, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as MainAccountsModel[];
    } catch (err) {
      throw new Error(`Could not get all MainAccounts. Error: ${err}`);
    }
  }

  // getAllMainAccounts
  async getAllMainAccounts(language: string): Promise<MainAccountsModel[]> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const item = await getAllMainAccounts(t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get all MainAccounts. Error: ${err}`);
    }
  }

  async create(mainAccounts: MainAccountsModel): Promise<MainAccountsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await MainAccounts.create(
          {
            mainAccountName: mainAccounts.mainAccountName,
            accountNumber: mainAccounts.accountNumber,
            salesmanID: mainAccounts.salesmanID,
            custInfoID: mainAccounts.custInfoID,
            cmpInfoID: mainAccounts.cmpInfoID,
            clientTypeID: mainAccounts.clientTypeID,
            creationDate: mainAccounts.creationDate,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new MainAccounts';
      });
    } catch (err) {
      throw new Error(`Could not add new MainAccounts. Error: ${err}`);
    }
  }

  async getMainAccountsById(ID: number, language: string): Promise<MainAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get MainAccounts by ID. Error: ${err}`);
    }
  }

  async getMainAccountsByUserId(ID: number, language: string): Promise<MainAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByUserId(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get MainAccounts by ID. Error: ${err}`);
    }
  }
  // getMainAccountByClientTypeID
  async getMainAccountByClientTypeID(ID: number, language: string): Promise<MainAccountsModel[] | string[]> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const item = await getMainAccountByClientTypeID(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get MainAccounts by ID. Error: ${err}`);
    }
  }

  async getSubAccountsByMainAccountId(ID: number, language: string): Promise<MainAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getSubAccountByMainAccountID(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get MainAccounts by ID. Error: ${err}`);
    }
  }

  async getSubAccountsConcatenatedByMainAccountIDs(IDs: string, language: string): Promise<MainAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start manged transaction and pass transaction object to the callback function
        const item = await getSubAccountConcatForMainAccountIDs(IDs, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get MainAccounts by ID. Error: ${err}`);
    }
  }

  async getSubAccountsForMultiMainAccountId(IDs: string, language: string): Promise<MainAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getSubAccountForMultipleMainAccountID(IDs, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get MainAccounts by ID. Error: ${err}`);
    }
  }

  async update(mainAccounts: MainAccountsModel, language: string): Promise<MainAccountsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await MainAccounts.update(
          {
            mainAccountName: mainAccounts.mainAccountName,
            accountNumber: mainAccounts.accountNumber,
            salesmanID: mainAccounts.salesmanID,
            custInfoID: mainAccounts.custInfoID,
            cmpInfoID: mainAccounts.cmpInfoID,
            clientTypeID: mainAccounts.clientTypeID,
          },
          {
            where: {
              ID: mainAccounts.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const item = await getById(mainAccounts.ID, t, language); // pass transaction object to getById function
        return item;
      });
    } catch (err) {
      throw new Error(`Could not update MainAccounts. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<MainAccountsModel>(MainAccounts, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate MainAccounts. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<MainAccountsModel>(MainAccounts, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate MainAccounts. Error: ${err}`);
    }
  }
}
