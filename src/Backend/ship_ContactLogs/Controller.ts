import { ContactLogsModel, ContactLogs } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_ContactLogs] @language = :language , @Method = :Method, @AWB = :AWB';
  const replacements = { language: language, Method: 'GET_ByAWB', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as ContactLogsModel;
};

export class ContactLogsController {
  async index(language: string, isActive: number): Promise<ContactLogsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_ContactLogs] @language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as ContactLogsModel[];
    } catch (err) {
      throw new Error(`Could not get all ContactLogs. Error: ${err}`);
    }
  }

  async create(contactLogs: ContactLogsModel): Promise<ContactLogsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ContactLogs.create(
          {
            AWB: contactLogs.AWB,
            userID: contactLogs.userID,
            contactTypeID: contactLogs.contactTypeID,
            actionDate: contactLogs.actionDate,
            smsTemplateID: contactLogs.smsTemplateID,
            phoneNumber: contactLogs.phoneNumber,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ContactLogs';
      });
    } catch (err) {
      throw new Error(`Could not add new ContactLogs. Error: ${err}`);
    }
  }

  async getContactLogsByAWB(AWB: string, language: string): Promise<ContactLogsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ContactLogs by ID. Error: ${err}`);
    }
  }

  async update(language: string, contactLogs: ContactLogsModel): Promise<ContactLogsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ContactLogs.update(
          {
            AWB: contactLogs.AWB,
            userID: contactLogs.userID,
            contactTypeID: contactLogs.contactTypeID,
            actionDate: contactLogs.actionDate,
            smsTemplateID: contactLogs.smsTemplateID,
            phoneNumber: contactLogs.phoneNumber,
          },
          {
            where: {
              ID: contactLogs.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getByAWB(contactLogs.AWB, language, t);
        return result ? result.toJSON() : 'Could not update ContactLogs';
      });
    } catch (err) {
      throw new Error(`Could not update ContactLogs. Error: ${err}`);
    }
  }

  async deactivate(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<ContactLogsModel>(ContactLogs, 'AWB', AWB, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ContactLogs. Error: ${err}`);
    }
  }

  async activate(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<ContactLogsModel>(ContactLogs, 'AWB', AWB, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ContactLogs. Error: ${err}`);
    }
  }
}
