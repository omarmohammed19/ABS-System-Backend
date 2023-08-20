import { StatusModel, Status } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';
import { AWBController } from '../AWBGenerator/Controller';
import { Transactions } from '../ship_Transactions/Model';
import { ca } from 'date-fns/locale';
import { TransactionHistory } from '../ship_TransactionHistory/Model';

const getByID = async (ID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_Status] @language = :language , @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as StatusModel;
};

export class StatusController {
  async index(language: string, isActive: number): Promise<StatusModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_Status] @language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as StatusModel[];
    } catch (err) {
      throw new Error(`Could not get all Status. Error: ${err}`);
    }
  }

  async getAll(language: string): Promise<StatusModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_Status] @language = :language , @Method = :Method ';
      const replacements = { language: language, Method: 'GET_All' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as StatusModel[];
    } catch (err) {
      throw new Error(`Could not get all Status. Error: ${err}`);
    }
  }


  async create(status: StatusModel): Promise<StatusModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Status.create(
          {
            enStatus: status.enStatus,
            arStatus: status.arStatus,
            custDisplayedStatusID: status.custDisplayedStatusID,
            requireReason: status.requireReason,
            Notes: status.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Status';
      });
    } catch (err) {
      throw new Error(`Could not add new Status. Error: ${err}`);
    }
  }

  async getPrevStatusByID(ID: number, language: string): Promise<StatusModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Status by ID. Error: ${err}`);
    }
  }

  async update(language: string, status: StatusModel): Promise<StatusModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Status.update(
          {
            enStatus: status.enStatus,
            arStatus: status.arStatus,
            custDisplayedStatusID: status.custDisplayedStatusID,
            requireReason: status.requireReason,
            Notes: status.Notes,
          },
          {
            where: {
              ID: status.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByID(status.ID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Status. Error: ${err}`);
    }
  }

  async updateStatus(AWBs: String, statusID: Number, userID: Number, shipmentTypeID: Number, runnerID?: Number, toBranchID?: Number, fromBranchID?: Number, currentBranchID?: Number, recipientID?: Number, recipientName?: String): Promise<any> {
    try {
      const query = 'EXEC [dbo].[p_Update_AWBStatus] @AWBs = :AWBs , @statusID = :statusID , @userID = :userID , @shipmentTypeID = :shipmentTypeID , @runnerID = :runnerID , @toBranchID = :toBranchID , @fromBranchID = :fromBranchID , @currentBranchID = :currentBranchID , @recipientID = :recipientID , @recipientName = :recipientName';
      const replacements = { AWBs: AWBs, statusID: statusID, userID: userID, shipmentTypeID: shipmentTypeID, runnerID: runnerID, toBranchID: toBranchID, fromBranchID: fromBranchID, currentBranchID: currentBranchID, recipientID: recipientID, recipientName: recipientName };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not update Status. Error: ${err}`);

    }
  }


  async updateAWbStatus(AWB: String, statusID: Number, transID: Number, userID: Number, shipmentTypeID: Number, runnerID?: Number, toBranchID?: Number, fromBranchID?: Number, currentBranchID?: Number, recipientID?: Number, recipientName?: String): Promise<any> {
    try {
      const result = await sequelize.transaction(async (t) => {
        await Transactions.update(
          {
            statusID: statusID,
            userID: userID,
            lastChangedDate: sequelize.literal('CURRENT_TIMESTAMP'),
            runnerID: runnerID,
            fromBranchID: fromBranchID,
            currentBranchID: currentBranchID,
            recipientID: recipientID,
            recipientName: recipientName,
          },
          {
            where: {
              AWB: AWB,
            },
            transaction: t, // pass transaction object to query
          }
        );

        await TransactionHistory.create(
          {
            transID: transID,
            shipmentTypeID: shipmentTypeID,
            statusID: statusID,
            auditDate: sequelize.literal('CURRENT_TIMESTAMP'),
            runnerID: runnerID,
            userID: userID,
            fromBranchID: fromBranchID,
            toBranchID: toBranchID,
            currentBranchID: currentBranchID,
          }
        );

      });
      return result;
    } catch (err) {
      throw new Error(`Could not update Status. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<StatusModel>(Status, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Status. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<StatusModel>(Status, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Status. Error: ${err}`);
    }
  }
}
