import { ContactPersonTypesModel, ContactPersonTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enContactPersonType', 'Notes'] : ['ID', 'arContactPersonType', 'Notes'];
  return ContactPersonTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ContactPersonTypesController {
  async index(language: string): Promise<ContactPersonTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enContactPersonType', 'Notes'] : ['ID', 'arContactPersonType', 'Notes'];
        const result = await ContactPersonTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ContactPersonTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ContactPersonTypes. Error: ${err}`);
    }
  }

  async indexDeActivated(language: string): Promise<ContactPersonTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enContactPersonType', 'Notes'] : ['ID', 'arContactPersonType', 'Notes'];
        const result = await ContactPersonTypes.findAll({
          attributes: attributes,
          where: {
            isActive: false,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ContactPersonTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ContactPersonTypes. Error: ${err}`);
    }
  }

  async create(ContactPersonType: ContactPersonTypesModel): Promise<ContactPersonTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ContactPersonTypes.create(
          {
            enContactPersonType: ContactPersonType.enContactPersonType,
            arContactPersonType: ContactPersonType.arContactPersonType,
            Notes: ContactPersonType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ContactPersonType';
      });
    } catch (err) {
      throw new Error(`Could not add new ContactPersonType. Error: ${err}`);
    }
  }

  async getContactPersonTypeByID(language: string, ID: number): Promise<ContactPersonTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ContactPersonTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ContactPersonType by ID. Error: ${err}`);
    }
  }

  async update(ContactPersonType: ContactPersonTypesModel): Promise<ContactPersonTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ContactPersonTypes.update(
          {
            enContactPersonType: ContactPersonType.enContactPersonType,
            arContactPersonType: ContactPersonType.arContactPersonType,
            Notes: ContactPersonType.Notes,
          },
          {
            where: {
              ID: ContactPersonType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(ContactPersonType.ID), t);
        return result ? result.toJSON() : 'Could not update ContactPersonTypes';
      });
    } catch (err) {
      throw new Error(`Could not update ContactPersonType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<ContactPersonTypesModel>(ContactPersonTypes, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ContactPersonType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<ContactPersonTypesModel>(ContactPersonTypes, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ContactPersonType. Error: ${err}`);
    }
  }
}
