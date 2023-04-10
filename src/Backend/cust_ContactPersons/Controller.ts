import { ContactPersonsModel, ContactPersons } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_ContactPersons] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as ContactPersonsModel;
};

export class ContactPersonsController {
  async index(language: string, limit: number, isActive: number): Promise<ContactPersonsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_ContactPersons] @language = :language, @limit= :limit, @isActive = :isActive ,@Method = :Method';
      const replacements = { language: language, limit: limit, isActive: isActive, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as ContactPersonsModel[];
    } catch (err) {
      throw new Error(`Could not get all ContactPersons. Error: ${err}`);
    }
  }

  async create(contactPerson: ContactPersonsModel): Promise<ContactPersonsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ContactPersons.create(
          {
            subAccountID: contactPerson.subAccountID,
            firstName: contactPerson.firstName,
            lastName: contactPerson.lastName,
            contactPersonTypeID: contactPerson.contactPersonTypeID,
            addressID: contactPerson.addressID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new contactPerson';
      });
    } catch (err) {
      throw new Error(`Could not add new contactPerson. Error: ${err}`);
    }
  }

  async getContactPersonsById(ID: number, language: string): Promise<ContactPersonsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ContactPerson by ID. Error: ${err}`);
    }
  }

  async update(contactPerson: ContactPersonsModel, language: string): Promise<ContactPersonsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ContactPersons.update(
          {
            subAccountID: contactPerson.subAccountID,
            firstName: contactPerson.firstName,
            lastName: contactPerson.lastName,
            contactPersonTypeID: contactPerson.contactPersonTypeID,
            addressID: contactPerson.addressID,
          },
          {
            where: {
              subAccountID: contactPerson.subAccountID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getByID(Number(contactPerson.ID), t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update contactPerson. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ContactPersonsModel>(ContactPersons, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ContactPersons. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ContactPersonsModel>(ContactPersons, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ContactPersons. Error: ${err}`);
    }
  }
}
