import { ContactNumberTypesModel, ContactNumberTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enContactNumberType', 'Notes'] : ['ID', 'arContactNumberType', 'Notes'];
  return ContactNumberTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ContactNumberTypesController {
  async index(language: string): Promise<ContactNumberTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enContactNumberType', 'Notes'] : ['ID', 'arContactNumberType', 'Notes'];
        const result = await ContactNumberTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ContactNumberTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ContactNumberTypes. Error: ${err}`);
    }
  }

  async create(ContactNumberType: ContactNumberTypesModel): Promise<ContactNumberTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ContactNumberTypes.create(
          {
            enContactNumberType: ContactNumberType.enContactNumberType,
            arContactNumberType: ContactNumberType.arContactNumberType,
            Notes: ContactNumberType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ContactNumberType';
      });
    } catch (err) {
      throw new Error(`Could not add new ContactNumberType. Error: ${err}`);
    }
  }

  async getContactNumberTypeByID(language: string, ID: number): Promise<ContactNumberTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ContactNumberTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ContactNumberType by ID. Error: ${err}`);
    }
  }

  async update(ContactNumberType: ContactNumberTypesModel): Promise<ContactNumberTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ContactNumberTypes.update(
          {
            enContactNumberType: ContactNumberType.enContactNumberType,
            arContactNumberType: ContactNumberType.arContactNumberType,
            Notes: ContactNumberType.Notes,
          },
          {
            where: {
              ID: ContactNumberType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(ContactNumberType.ID), t);
        return result ? result.toJSON() : 'Could not update ContactNumberTypes';
      });
    } catch (err) {
      throw new Error(`Could not update ContactNumberTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<ContactNumberTypesModel>(ContactNumberTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ContactNumberType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<ContactNumberTypesModel>(ContactNumberTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ContactNumberType. Error: ${err}`);
    }
  }
}
