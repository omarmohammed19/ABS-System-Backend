import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByTransHdrID = async (transHdrID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_TransactionsForClient] @language = :language , @Method = :Method, @TransHdrID = :transHdrID';
  const replacements = { language: language, Method: 'GET_ByTransHdrID', transHdrID: transHdrID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

const getByAWB = async (AWB: string, language: string, t: Transaction, subAccountID: number) => {
  const query = 'EXEC [dbo].[p_GET_ship_TransactionsForClient] @language = :language , @Method = :Method, @AWB = :AWB, @subAccountID = :subAccountID';
  const replacements = { language: language, Method: 'GET_ByAWB', AWB: AWB, subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

const getByMainAccountID = async (mainAccountID: number, language: string, t: Transaction, limits?: number) => {
  const limit = limits || 10;
  const query =
    'EXEC [dbo].[p_GET_ship_TransactionsForClient]@limit = :limit, @language = :language , @Method = :Method, @mainAccountID = :mainAccountID';
  const replacements = { limit: limit, language: language, Method: 'GET_ByMainAccountID', mainAccountID: mainAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

const getBySubAccountID = async (subAccountID: number, language: string, t: Transaction, limits?: number) => {
  const limit = limits || 10;
  const query =
    'EXEC [dbo].[p_GET_ship_TransactionsForClient]@limit = :limit, @language = :language , @Method = :Method, @subAccountID = :subAccountID';
  const replacements = { limit: limit, language: language, Method: 'GET_BySubAccountID', subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

export class ShipmentsController {
  async getTransactionsByTransHdrID(TransHdrID: number, language: string): Promise<any | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByTransHdrID(TransHdrID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Transactions by ID. Error: ${err}`);
    }
  }

  async getTransactionsBymainAccountID(mainAccountID: number, language: string, limit?: number): Promise<any | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByMainAccountID(mainAccountID, language, t, limit); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Transactions by ID. Error: ${err}`);
    }
  }

  async getTransactionsBysubAccountID(subAccountID: number, language: string, limit?: number): Promise<any | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getBySubAccountID(subAccountID, language, t, limit); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Transactions by ID. Error: ${err}`);
    }
  }

  async getTransactionsByAWB(AWB: string, language: string, subAccountID: number): Promise<any | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, language, t, subAccountID); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Transactions by ID. Error: ${err}`);
    }
  }
}
