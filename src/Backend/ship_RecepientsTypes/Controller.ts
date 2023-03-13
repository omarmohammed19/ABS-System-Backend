import { RecipientTypesModel, RecipientTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enRecipientType', 'Notes'] : ['ID', 'arRecipientType', 'Notes'];
  return RecipientTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class RecipientTypesController {
  async index(language: string): Promise<RecipientTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enRecipientType', 'Notes'] : ['ID', 'arRecipientType', 'Notes'];
        const result = await RecipientTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as RecipientTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all RecipientTypes. Error: ${err}`);
    }
  }

  async create(recipientTypes: RecipientTypesModel): Promise<RecipientTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await RecipientTypes.create(
          {
            enRecipientType: recipientTypes.enRecipientType,
            arRecipientType: recipientTypes.arRecipientType,
            Notes: recipientTypes.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new RecipientTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new RecipientType. Error: ${err}`);
    }
  }

  async getRecipientTypeById(language: string, ID: number): Promise<RecipientTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get RecipientTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get RecipientType by ID. Error: ${err}`);
    }
  }

  async update(recipientTypes: RecipientTypesModel): Promise<RecipientTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await RecipientTypes.update(
          {
            enRecipientType: recipientTypes.enRecipientType,
            arRecipientType: recipientTypes.arRecipientType,
            Notes: recipientTypes.Notes,
          },
          {
            where: {
              ID: recipientTypes.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(recipientTypes.ID), t);
        return result ? result.toJSON() : 'Could not update RecipientTypes';
      });
    } catch (err) {
      throw new Error(`Could not update RecipientType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<RecipientTypesModel>(RecipientTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate RecipientType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<RecipientTypesModel>(RecipientTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate RecipientType. Error: ${err}`);
    }
  }
}
