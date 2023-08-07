import { RecipientTypesModel, RecipientTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';


const getByID = async (ID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_RecipientTypes] @language = :language , @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as RecipientTypesModel;
};

export class RecipientTypesController {
  async index(language: string): Promise<RecipientTypesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_RecipientTypes] @language = :language , @Method = :Method';
      const replacements = { language: language, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as RecipientTypesModel[];
    } catch (err) {
      throw new Error(`Could not get all Recipient types. Error: ${err}`);
    }
  }

  async create(recipientType: RecipientTypesModel): Promise<RecipientTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await RecipientTypes.create(
          {
            enRecipientType: recipientType.enRecipientType,
            arRecipientType: recipientType.arRecipientType,
            Notes: recipientType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Recipient type';
      });
    } catch (err) {
      throw new Error(`Could not add new Recipient type. Error: ${err}`);
    }
  }

  async getRecipientTypeByID(ID: number, language: string): Promise<RecipientTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Recipient type by ID. Error: ${err}`);
    }
  }

  async update(language: string, recipientType: RecipientTypesModel): Promise<RecipientTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await RecipientTypes.update(
          {
            enRecipientType: recipientType.enRecipientType,
            arRecipientType: recipientType.arRecipientType,
            Notes: recipientType.Notes,
          },
          {
            where: {
              ID: recipientType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByID(recipientType.ID, language, t);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Recipient type. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<RecipientTypesModel>(RecipientTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Recipient type. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<RecipientTypesModel>(RecipientTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Recipient type. Error: ${err}`);
    }
  }
}
