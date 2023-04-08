import { PrevStatusModel, PrevStatus } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (statusID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_prevStatus] @language = :language , @Method = :Method, @statusID = :statusID';
  const replacements = { language: language, Method: 'GET_ByID', statusID: statusID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as PrevStatusModel;
};

export class PrevStatusController {
  async index(language: string, isActive: number): Promise<PrevStatusModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_prevStatus] @language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as PrevStatusModel[];
    } catch (err) {
      throw new Error(`Could not get all PrevStatus. Error: ${err}`);
    }
  }

  async create(prevStatus: PrevStatusModel): Promise<PrevStatusModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PrevStatus.create(
          {
            statusID: prevStatus.statusID,
            prevStatusID: prevStatus.prevStatusID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new PrevStatus';
      });
    } catch (err) {
      throw new Error(`Could not add new PrevStatus. Error: ${err}`);
    }
  }

  async getPrevStatusByID(ID: number, language: string): Promise<PrevStatusModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get PrevStatus by ID. Error: ${err}`);
    }
  }

  async update(language: string, prevStatus: PrevStatusModel): Promise<PrevStatusModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await PrevStatus.update(
          {
            statusID: prevStatus.statusID,
            prevStatusID: prevStatus.prevStatusID,
          },
          {
            where: {
              ID: prevStatus.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByID(prevStatus.statusID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update PrevStatus. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PrevStatusModel>(PrevStatus, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PrevStatus. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PrevStatusModel>(PrevStatus, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PrevStatus. Error: ${err}`);
    }
  }
}
