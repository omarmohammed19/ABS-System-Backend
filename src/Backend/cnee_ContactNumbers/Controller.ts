import { ContactNumbersModel, ContactNumbers } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cnee_ContactNumbers] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as ContactNumbersModel;
};

export class ContactNumbersController {
  async index(language: string, limit: number, isActive: number): Promise<ContactNumbersModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cnee_ContactNumbers] @language = :language, @limit = :limit , @isActive = :isActive ,@Method = :Method';
      const replacements = { language: language, limit: limit, isActive: isActive, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as ContactNumbersModel[];
    } catch (err) {
      throw new Error(`Could not get all Contact Numbers. Error: ${err}`);
    }
  }

  async create(ContactNumber: ContactNumbersModel): Promise<ContactNumbersModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ContactNumbers.create(
          {
            contactNumber: ContactNumber.contactNumber,
            cneeContactPersonID: ContactNumber.cneeContactPersonID,
            numberTypeID: ContactNumber.numberTypeID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Contact Number';
      });
    } catch (err) {
      throw new Error(`Could not add new Contact Number. Error: ${err}`);
    }
  }

  async getContactNumbersById(ID: number, language: string): Promise<ContactNumbersModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Contact Number by ID. Error: ${err}`);
    }
  }

  async update(ContactNumber: ContactNumbersModel, language: string): Promise<ContactNumbersModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ContactNumbers.update(
          {
            contactNumber: ContactNumber.contactNumber,
            cneeContactPersonID: ContactNumber.cneeContactPersonID,
            numberTypeID: ContactNumber.numberTypeID,
          },
          {
            where: {
              ID: ContactNumber.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(ContactNumber.ID), t, language); // pass transaction object to getById function
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Contact Numbers. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ContactNumbersModel>(ContactNumbers, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Contact Numbers. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ContactNumbersModel>(ContactNumbers, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Contact Numbers. Error: ${err}`);
    }
  }
}
