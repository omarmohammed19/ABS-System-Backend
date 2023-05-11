import { TransactionHdrModel, TransactionHdr } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (ID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_TransactionHdr] @language = :language , @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionHdrModel;
};

const getBySubAccountID = async (subAccountID: number, language: string, t: Transaction, limits?: number) => {
  const limit = limits || 10;
  const query = 'EXEC [dbo].[p_GET_ship_TransactionHdr] @limit = :limit ,@language = :language , @Method = :Method, @subAccountID = :subAccountID';
  const replacements = { limit: limit, language: language, Method: 'GET_BySubAccountID', subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionHdrModel;
};

const getByMainAccountID = async (mainAccountID: number, language: string, t: Transaction, limits?: number) => {
  const limit = limits || 10;
  const query = 'EXEC [dbo].[p_GET_ship_TransactionHdr] @limit = :limit ,@language = :language , @Method = :Method, @mainAccountID = :mainAccountID';
  const replacements = { limit: limit, language: language, Method: 'GET_ByMainAccountID', mainAccountID: mainAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionHdrModel;
};

export class TransactionHdrController {
  async index(language: string, isActive: number, limits?: number): Promise<TransactionHdrModel[]> {
    const limit = limits || 10;
    try {
      const query = 'EXEC [dbo].[p_GET_ship_TransactionHdr] @limit = :limit ,@language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { limit: limit, language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as TransactionHdrModel[];
    } catch (err) {
      throw new Error(`Could not get all TransactionHdr. Error: ${err}`);
    }
  }

  async create(transactionHdr: TransactionHdrModel): Promise<TransactionHdrModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await TransactionHdr.create(
          {
            mainAccountID: transactionHdr.mainAccountID,
            subAccountID: transactionHdr.subAccountID,
            userID: transactionHdr.userID,
            serviceID: transactionHdr.serviceID,
            creationDate: transactionHdr.creationDate,
            noOfAWBs: transactionHdr.noOfAWBs,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new TransactionHdr';
      });
    } catch (err) {
      throw new Error(`Could not add new TransactionHdr. Error: ${err}`);
    }
  }

  async getTransactionHdrByID(ID: number, language: string): Promise<TransactionHdrModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get TransactionHdr by ID. Error: ${err}`);
    }
  }

  async getTransactionHdrBySubAccountID(SubAccountID: number, language: string, limit?: number): Promise<TransactionHdrModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getBySubAccountID(SubAccountID, language, t, limit); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get TransactionHdr by ID. Error: ${err}`);
    }
  }

  async getTransactionHdrByMainAccountID(MainAccountID: number, language: string, limit?: number): Promise<TransactionHdrModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByMainAccountID(MainAccountID, language, t, limit); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get TransactionHdr by ID. Error: ${err}`);
    }
  }

  async update(language: string, transactionHdr: TransactionHdrModel): Promise<TransactionHdrModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await TransactionHdr.update(
          {
            mainAccountID: transactionHdr.mainAccountID,
            subAccountID: transactionHdr.subAccountID,
            userID: transactionHdr.userID,
            serviceID: transactionHdr.serviceID,
            creationDate: transactionHdr.creationDate,
            noOfAWBs: transactionHdr.noOfAWBs,
          },
          {
            where: {
              ID: transactionHdr.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByID(transactionHdr.ID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update TransactionHdr. Error: ${err}`);
    }
  }

  async deactivateByID(ID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHdrModel>(TransactionHdr, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate TransactionHdr. Error: ${err}`);
    }
  }

  async activateByID(ID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHdrModel>(TransactionHdr, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate TransactionHdr. Error: ${err}`);
    }
  }

  async deactivateBySubAccountID(subAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHdrModel>(TransactionHdr, 'subAccountID', subAccountID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate TransactionHdr. Error: ${err}`);
    }
  }

  async activateBySubAccountID(subAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHdrModel>(TransactionHdr, 'subAccountID', subAccountID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate TransactionHdr. Error: ${err}`);
    }
  }

  async deactivateByMainAccountID(mainAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHdrModel>(TransactionHdr, 'mainAccountID', mainAccountID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate TransactionHdr. Error: ${err}`);
    }
  }

  async activateByMainAccountID(mainAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHdrModel>(TransactionHdr, 'mainAccountID', mainAccountID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate TransactionHdr. Error: ${err}`);
    }
  }
}
