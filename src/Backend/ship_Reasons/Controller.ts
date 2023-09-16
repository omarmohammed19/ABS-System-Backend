import { ReasonsModel, Reasons } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';


const getByID = async (ID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_Reasons] @language = :language , @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as ReasonsModel;
};

export class ReasonsController {
  async index(language: string): Promise<ReasonsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_Reasons] @language = :language , @Method = :Method';
      const replacements = { language: language, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as ReasonsModel[];
    } catch (err) {
      throw new Error(`Could not get all Reason. Error: ${err}`);
    }
  }

  async create(reason: ReasonsModel): Promise<ReasonsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Reasons.create(
          {
            enReason: reason.enReason,
            arReason: reason.arReason,
            Notes: reason.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Reason';
      });
    } catch (err) {
      throw new Error(`Could not add new Reason. Error: ${err}`);
    }
  }

  async getReasonByID(ID: number, language: string): Promise<ReasonsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Reason by ID. Error: ${err}`);
    }
  }

  async update(language: string, reason: ReasonsModel): Promise<ReasonsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Reasons.update(
          {
            enReason: reason.enReason,
            arReason: reason.arReason,
            Notes: reason.Notes,
          },
          {
            where: {
              ID: reason.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByID(reason.ID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Reason. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ReasonsModel>(Reasons, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Reason. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ReasonsModel>(Reasons, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Reason. Error: ${err}`);
    }
  }
}
