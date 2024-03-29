import { SubAccountsModel, SubAccounts } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_SubAccounts] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as SubAccountsModel;
};

const getPaymentMethod = async (subAccountID: number, t: Transaction) => {
  return SubAccounts.findOne({
    attributes: ['paymentMethodID'],
    where: {
      ID: subAccountID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

const getAllSubAccounts = async (t: Transaction) => {
  return SubAccounts.findAll({
    attributes: ['ID', 'subAccountName'],
    where: {
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class SubAccountsController {
  async index(language: string, isActive: number, limit: number): Promise<SubAccountsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_SubAccounts] @language = :language, @Method = :Method, @isActive = :isActive, @limit = :limit';
      const replacements = { language: language, Method: 'GET', isActive: isActive, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as SubAccountsModel[];
    } catch (err) {
      throw new Error(`Could not get all SubAccounts. Error: ${err}`);
    }
  }

  async create(subAccounts: SubAccountsModel): Promise<SubAccountsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await SubAccounts.create(
          {
            mainAccountID: subAccounts.mainAccountID,
            subAccountName: subAccounts.subAccountName,
            accountNumber: subAccounts.accountNumber,
            pricePlanID: subAccounts.pricePlanID,
            paymentMethodID: subAccounts.paymentMethodID,
            productTypeID: subAccounts.productTypeID,
            customerServiceID: subAccounts.customerServiceID,
            prefix: subAccounts.prefix,
            creationDate: subAccounts.creationDate,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new SubAccounts';
      });
    } catch (err) {
      throw new Error(`Could not add new SubAccounts. Error: ${err}`);
    }
  }

  async getSubAccountsById(ID: number, language: string): Promise<SubAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get SubAccounts by ID. Error: ${err}`);
    }
  }

  async getAllSubAccounts(language: string): Promise<SubAccountsModel[] | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const item = await getAllSubAccounts(t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get SubAccounts by ID. Error: ${err}`);
    }
  }

  async getSubAccountsByMainAccountId(language: string, isActive: number, mainAccountID: number): Promise<SubAccountsModel[]> {
    try {
      const query =
        'EXEC [dbo].[p_GET_cust_SubAccounts] @language = :language, @Method = :Method, @isActive = :isActive, @mainAccountID = :mainAccountID';
      const replacements = { language: language, Method: 'GET_ByMainAccountID', isActive: isActive, mainAccountID: mainAccountID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as SubAccountsModel[];
    } catch (err) {
      throw new Error(`Could not get SubAccounts by MainAccountID. Error: ${err}`);
    }
  }

  async getPaymentMethodBySubAccountIDId(subAccountID: number): Promise<SubAccountsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getPaymentMethod(subAccountID, t); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get PaymentMethods by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get PaymentMethods by ID. Error: ${err}`);
    }
  }

  async update(subAccounts: SubAccountsModel, language: string): Promise<SubAccountsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await SubAccounts.update(
          {
            mainAccountID: subAccounts.mainAccountID,
            subAccountName: subAccounts.subAccountName,
            accountNumber: subAccounts.accountNumber,
            pricePlanID: subAccounts.pricePlanID,
            paymentMethodID: subAccounts.paymentMethodID,
            productTypeID: subAccounts.productTypeID,
            customerServiceID: subAccounts.customerServiceID,
            prefix: subAccounts.prefix,
            creationDate: subAccounts.creationDate,
          },
          {
            where: {
              ID: subAccounts.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const item = await getById(subAccounts.ID, t, language); // pass transaction object to getById function
        return item;
      });
    } catch (err) {
      throw new Error(`Could not update SubAccounts. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SubAccountsModel>(SubAccounts, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate SubAccounts. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SubAccountsModel>(SubAccounts, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate SubAccounts. Error: ${err}`);
    }
  }
}
