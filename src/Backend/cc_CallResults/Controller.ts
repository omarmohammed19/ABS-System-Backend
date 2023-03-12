import { CallResults, CallResultsModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enCallResult', 'Notes'] : ['ID', 'arCallResult', 'Notes'];
  return CallResults.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class CallResultsController {
  async index(language: string): Promise<CallResultsModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enCallResult', 'Notes'] : ['ID', 'arCallResult', 'Notes'];
        const result = await CallResults.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as CallResultsModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all CallResults. Error: ${err}`);
    }
  }

  async create(callResult: CallResultsModel): Promise<CallResultsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await CallResults.create(
          {
            enCallResult: callResult.enCallResult,
            arCallResult: callResult.arCallResult,
            Notes: callResult.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new CallResults';
      });
    } catch (err) {
      throw new Error(`Could not add new CallResults. Error: ${err}`);
    }
  }

  async getCallResultByID(language: string, ID: number): Promise<CallResultsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get CallResult by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get CallResult by ID. Error: ${err}`);
    }
  }

  async update(callResult: CallResultsModel): Promise<CallResultsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await CallResults.update(
          {
            enCallResult: callResult.enCallResult,
            arCallResult: callResult.arCallResult,
            Notes: callResult.Notes,
          },
          {
            where: {
              ID: callResult.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(callResult.ID), t);
        return result ? result.toJSON() : 'Could not update CallResult';
      });
    } catch (err) {
      throw new Error(`Could not update CallResult. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<CallResultsModel>(CallResults, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate CallResult. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<CallResultsModel>(CallResults, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate CallResult. Error: ${err}`);
    }
  }
}
