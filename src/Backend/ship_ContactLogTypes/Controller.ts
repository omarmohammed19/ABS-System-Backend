import { ContactLogTypesModel, ContactLogTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enContactLogType', 'Notes'] : ['ID', 'arContactLogType', 'Notes'];

  return ContactLogTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ContactLogTypesController {
  async index(language: string): Promise<ContactLogTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enContactLogType', 'Notes'] : ['ID', 'arContactLogType', 'Notes'];
        const result = await ContactLogTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ContactLogTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ContactLogTypes. Error: ${err}`);
    }
  }

  async create(contactLogType: ContactLogTypesModel): Promise<ContactLogTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ContactLogTypes.create(
          {
            enContactLogType: contactLogType.enContactLogType,
            arContactLogType: contactLogType.arContactLogType,
            Notes: contactLogType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ContactLogTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new ContactLogTypes. Error: ${err}`);
    }
  }

  async getContactLogTypeById(language: string, ID: number): Promise<ContactLogTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ContactLogTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ContactLogTypes by ID. Error: ${err}`);
    }
  }

  async update(contactLogType: ContactLogTypesModel): Promise<ContactLogTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ContactLogTypes.update(
          {
            enContactLogType: contactLogType.enContactLogType,
            arContactLogType: contactLogType.arContactLogType,
            Notes: contactLogType.Notes,
          },
          {
            where: {
              ID: contactLogType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(contactLogType.ID), t);
        return result ? result.toJSON() : 'Could not update ContactLogTypes';
      });
    } catch (err) {
      throw new Error(`Could not update ContactLogTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ContactLogTypesModel>(ContactLogTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ContactLogTypes. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ContactLogTypesModel>(ContactLogTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ContactLogTypes. Error: ${err}`);
    }
  }
}
