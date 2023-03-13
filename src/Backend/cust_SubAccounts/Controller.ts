import { SubAccountsModel, SubAccounts } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_SubAccounts] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options)
  return result as unknown as SubAccountsModel;
};

export class SubAccountsController {
  async index(language: string): Promise<SubAccountsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_SubAccounts] @language = :language, @Method = :Method';
      const replacements = { language: language, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as SubAccountsModel[];
    } catch (err) {
      throw new Error(`Could not get all PaymentMethods. Error: ${err}`);
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
      const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get SubAccounts by ID. Error: ${err}`);
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
            transaction: t // pass transaction object to query
          });

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
