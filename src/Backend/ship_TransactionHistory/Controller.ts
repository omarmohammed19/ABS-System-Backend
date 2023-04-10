import { TransactionHistoryModel, TransactionHistory } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_TransactionHistory] @language = :language , @Method = :Method, @AWB = :AWB';
  const replacements = { language: language, Method: 'GET_ByAWB', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionHistoryModel;
};

const getByTransID = async (ID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_TransactionHistory] @language = :language , @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionHistoryModel;
};

const getTransIDByAWB = async (AWB: string) => {
  const query = 'EXEC [dbo].[p_GET_ship_TransactionHistory]  @Method = :Method, @AWB = :AWB';
  const replacements = { Method: 'Get_TransIDByAWB', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionHistoryModel;
};

export class TransactionHistoryController {
  async index(language: string, isActive: number, limits?: number): Promise<TransactionHistoryModel[]> {
    const limit = limits || 10;
    try {
      const query = 'EXEC [dbo].[p_GET_ship_TransactionHistory] @limit = :limit ,@language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { limit: limit, language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as TransactionHistoryModel[];
    } catch (err) {
      throw new Error(`Could not get all TransactionHistory. Error: ${err}`);
    }
  }

  async create(transactionHistory: TransactionHistoryModel): Promise<TransactionHistoryModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await TransactionHistory.create(
          {
            transID: transactionHistory.transID,
            shipmentTypeID: transactionHistory.shipmentTypeID,
            statusID: transactionHistory.statusID,
            runnerID: transactionHistory.runnerID,
            auditDate: transactionHistory.auditDate,
            reasonID: transactionHistory.reasonID,
            userID: transactionHistory.userID,
            fromBranchID: transactionHistory.fromBranchID,
            toBranchID: transactionHistory.toBranchID,
            currentBranchID: transactionHistory.currentBranchID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new TransactionHistory';
      });
    } catch (err) {
      throw new Error(`Could not add new TransactionHistory. Error: ${err}`);
    }
  }

  async getTransactionHistoryByAWB(AWB: string, language: string): Promise<TransactionHistoryModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get TransactionHistory by ID. Error: ${err}`);
    }
  }

  async updateByID(language: string, transactionHistory: TransactionHistoryModel): Promise<TransactionHistoryModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await TransactionHistory.update(
          {
            shipmentTypeID: transactionHistory.shipmentTypeID,
            statusID: transactionHistory.statusID,
            runnerID: transactionHistory.runnerID,
            auditDate: transactionHistory.auditDate,
            reasonID: transactionHistory.reasonID,
            userID: transactionHistory.userID,
            fromBranchID: transactionHistory.fromBranchID,
            toBranchID: transactionHistory.toBranchID,
            currentBranchID: transactionHistory.currentBranchID,
          },
          {
            where: {
              ID: transactionHistory.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByTransID(transactionHistory.ID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update TransactionHistory. Error: ${err}`);
    }
  }

  async updateByAWB(AWB: string, language: string, transactionHistory: TransactionHistoryModel): Promise<TransactionHistoryModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        const ID: any = await getTransIDByAWB(AWB);
        const transactionID = ID[0].ID;
        // start managed transaction and pass transaction object to the callback function
        await TransactionHistory.update(
          {
            shipmentTypeID: transactionHistory.shipmentTypeID,
            statusID: transactionHistory.statusID,
            runnerID: transactionHistory.runnerID,
            auditDate: transactionHistory.auditDate,
            reasonID: transactionHistory.reasonID,
            userID: transactionHistory.userID,
            fromBranchID: transactionHistory.fromBranchID,
            toBranchID: transactionHistory.toBranchID,
            currentBranchID: transactionHistory.currentBranchID,
          },
          {
            where: {
              transID: transactionID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByAWB(AWB, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update TransactionHistory. Error: ${err}`);
    }
  }

  async deactivateByID(ID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHistoryModel>(TransactionHistory, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate TransactionHistory. Error: ${err}`);
    }
  }

  async activateByID(ID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionHistoryModel>(TransactionHistory, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate TransactionHistory. Error: ${err}`);
    }
  }

  async deactivateByAWB(AWB: string): Promise<string> {
    try {
      const ID: any = await getTransIDByAWB(AWB);
      const transactionID = ID[0].ID;
      const result = await De_Activate<TransactionHistoryModel>(TransactionHistory, 'transID', transactionID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate TransactionHistory. Error: ${err}`);
    }
  }

  async activateByAWB(AWB: string): Promise<string> {
    try {
      const ID: any = await getTransIDByAWB(AWB);
      const transactionID = ID[0].ID;
      const result = await De_Activate<TransactionHistoryModel>(TransactionHistory, 'transID', transactionID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate TransactionHistory. Error: ${err}`);
    }
  }
}
