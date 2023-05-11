import { TransactionsModel, Transactions } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByTransHdrID = async (transHdrID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_Transactions] @language = :language , @Method = :Method, @TransHdrID = :transHdrID';
  const replacements = { language: language, Method: 'GET_ByTransHdrID', transHdrID: transHdrID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionsModel;
};

const getByAWB = async (AWB: string, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_Transactions] @language = :language , @Method = :Method, @AWB = :AWB';
  const replacements = { language: language, Method: 'GET_ByAWB', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionsModel;
};

const getByMainAccountID = async (mainAccountID: number, language: string, t: Transaction, limits?: number) => {
  const limit = limits || 10;
  const query = 'EXEC [dbo].[p_GET_ship_Transactions]@limit = :limit, @language = :language , @Method = :Method, @mainAccountID = :mainAccountID';
  const replacements = { limit: limit, language: language, Method: 'GET_ByMainAccountID', mainAccountID: mainAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionsModel;
};

const getBySubAccountID = async (subAccountID: number, language: string, t: Transaction, limits?: number) => {
  const limit = limits || 10;
  const query = 'EXEC [dbo].[p_GET_ship_Transactions]@limit = :limit, @language = :language , @Method = :Method, @subAccountID = :subAccountID';
  const replacements = { limit: limit, language: language, Method: 'GET_BySubAccountID', subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as TransactionsModel;
};

export class TransactionsController {
  async index(language: string, isActive: number, limits?: number): Promise<TransactionsModel[]> {
    const limit = limits || 10;
    try {
      const query = 'EXEC [dbo].[p_GET_ship_Transactions] @limit = :limit ,@language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { limit: limit, language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as TransactionsModel[];
    } catch (err) {
      throw new Error(`Could not get all Transactions. Error: ${err}`);
    }
  }

  async create(transactions: TransactionsModel): Promise<TransactionsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Transactions.create(
          {
            transHdrID: transactions.transHdrID,
            AWB: transactions.AWB,
            Ref: transactions.Ref,
            mainAccountID: transactions.mainAccountID,
            subAccountID: transactions.subAccountID,
            serviceID: transactions.serviceID,
            shipmentTypeID: transactions.shipmentTypeID,
            statusID: transactions.statusID,
            actualDeliveryDate: transactions.actualDeliveryDate,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            productID: transactions.productID,
            runnerID: transactions.runnerID,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: transactions.deliveryBranchID,
            fromBranchID: transactions.fromBranchID,
            toBranchID: transactions.toBranchID,
            currentBranchID: transactions.currentBranchID,
            specialInstructions: transactions.specialInstructions,
            IDNO: transactions.IDNO,
            recipientID: transactions.recipientID,
            recipientName: transactions.recipientName,
            packageTypeID: transactions.packageTypeID,
            noOfPcs: transactions.noOfPcs,
            contents: transactions.contents,
            weight: transactions.weight,
            length: transactions.length,
            width: transactions.width,
            height: transactions.height,
            actualWeight: transactions.actualWeight,
            Cash: transactions.Cash,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Transactions';
      });
    } catch (err) {
      throw new Error(`Could not add new Transactions. Error: ${err}`);
    }
  }

  async getTransactionsByTransHdrID(TransHdrID: number, language: string): Promise<TransactionsModel | string> {
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

  async getTransactionsBymainAccountID(mainAccountID: number, language: string, limit?: number): Promise<TransactionsModel | string> {
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

  async getTransactionsBysubAccountID(subAccountID: number, language: string, limit?: number): Promise<TransactionsModel | string> {
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

  async getTransactionsByAWB(AWB: string, language: string): Promise<TransactionsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Transactions by ID. Error: ${err}`);
    }
  }

  async updateByAWB(language: string, transactions: TransactionsModel): Promise<TransactionsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Transactions.update(
          {
            transHdrID: transactions.transHdrID,
            Ref: transactions.Ref,
            mainAccountID: transactions.mainAccountID,
            subAccountID: transactions.subAccountID,
            serviceID: transactions.serviceID,
            shipmentTypeID: transactions.shipmentTypeID,
            statusID: transactions.statusID,
            actualDeliveryDate: transactions.actualDeliveryDate,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            productID: transactions.productID,
            runnerID: transactions.runnerID,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: transactions.deliveryBranchID,
            fromBranchID: transactions.fromBranchID,
            toBranchID: transactions.toBranchID,
            currentBranchID: transactions.currentBranchID,
            specialInstructions: transactions.specialInstructions,
            IDNO: transactions.IDNO,
            recipientID: transactions.recipientID,
            recipientName: transactions.recipientName,
            packageTypeID: transactions.packageTypeID,
            noOfPcs: transactions.noOfPcs,
            contents: transactions.contents,
            weight: transactions.weight,
            length: transactions.length,
            width: transactions.width,
            height: transactions.height,
            actualWeight: transactions.actualWeight,
            Cash: transactions.Cash,
            collectedFromRunner: transactions.collectedFromRunner,
            collectedFromBranch: transactions.collectedFromBranch,
            paymentDate: transactions.paymentDate,
            isPaid: transactions.isPaid,
          },
          {
            where: {
              AWB: transactions.AWB,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByAWB(transactions.AWB, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Transactions. Error: ${err}`);
    }
  }

  async updateByTransHdrID(language: string, transactions: TransactionsModel): Promise<TransactionsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Transactions.update(
          {
            AWB: transactions.AWB,
            Ref: transactions.Ref,
            mainAccountID: transactions.mainAccountID,
            subAccountID: transactions.subAccountID,
            serviceID: transactions.serviceID,
            shipmentTypeID: transactions.shipmentTypeID,
            statusID: transactions.statusID,
            actualDeliveryDate: transactions.actualDeliveryDate,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            productID: transactions.productID,
            runnerID: transactions.runnerID,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: transactions.deliveryBranchID,
            fromBranchID: transactions.fromBranchID,
            toBranchID: transactions.toBranchID,
            currentBranchID: transactions.currentBranchID,
            specialInstructions: transactions.specialInstructions,
            IDNO: transactions.IDNO,
            recipientID: transactions.recipientID,
            recipientName: transactions.recipientName,
            packageTypeID: transactions.packageTypeID,
            noOfPcs: transactions.noOfPcs,
            contents: transactions.contents,
            weight: transactions.weight,
            length: transactions.length,
            width: transactions.width,
            height: transactions.height,
            actualWeight: transactions.actualWeight,
            Cash: transactions.Cash,
            collectedFromRunner: transactions.collectedFromRunner,
            collectedFromBranch: transactions.collectedFromBranch,
            paymentDate: transactions.paymentDate,
            isPaid: transactions.isPaid,
          },
          {
            where: {
              transHdrID: transactions.transHdrID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByTransHdrID(transactions.transHdrID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Transactions. Error: ${err}`);
    }
  }

  async deactivateByAWB(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'AWB', AWB, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Transactions. Error: ${err}`);
    }
  }

  async activateByAWB(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'AWB', AWB, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Transactions. Error: ${err}`);
    }
  }

  async deactivateByTransHdrID(TransHdrID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'transHdrID', TransHdrID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Transactions. Error: ${err}`);
    }
  }

  async activateByTransHdrID(TransHdrID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'transHdrID', TransHdrID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Transactions. Error: ${err}`);
    }
  }

  async deactivateByMainAccountID(mainAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'mainAccountID', mainAccountID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Transactions. Error: ${err}`);
    }
  }

  async activateByMainAccountID(mainAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'mainAccountID', mainAccountID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Transactions. Error: ${err}`);
    }
  }

  async deactivateBySubAccountID(subAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'subAccountID', subAccountID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Transactions. Error: ${err}`);
    }
  }

  async activateBySubAccountID(subAccountID: number): Promise<string> {
    try {
      const result = await De_Activate<TransactionsModel>(Transactions, 'subAccountID', subAccountID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Transactions. Error: ${err}`);
    }
  }
}
