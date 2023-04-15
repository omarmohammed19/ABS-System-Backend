import { EmailsModel, Emails } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cnee_Emails] @language = :language, @Method = :Method, @AWB = :AWB';
  const replacements = { language: language, Method: 'GET_ByID', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as EmailsModel;
};

export class EmailsController {
  async index(language: string, limit: number, isActive: number): Promise<EmailsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cnee_Emails] @language = :language, @limit = :limit , @isActive = :isActive ,@Method = :Method';
      const replacements = { language: language, limit: limit, isActive: isActive, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as EmailsModel[];
    } catch (err) {
      throw new Error(`Could not get all Emails. Error: ${err}`);
    }
  }

  async create(Email: EmailsModel): Promise<EmailsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Emails.create(
          {
            emailTypeID: Email.emailTypeID,
            contactPersonID: Email.contactPersonID,
            email: Email.email,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Email';
      });
    } catch (err) {
      throw new Error(`Could not add new Email. Error: ${err}`);
    }
  }

  async getEmailsByAWB(AWB: string, language: string): Promise<EmailsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Email by AWB. Error: ${err}`);
    }
  }

  async update(Email: string, AWB: string): Promise<EmailsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cnee_Emails] @AWB = :AWB , @Email = :Email , @Method = :Method';
      const replacements = { AWB: AWB, Email: Email, Method: 'UPDATE' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.UPDATE };
      const result = await sequelize.query(query, options);
      return result as unknown as EmailsModel[];
    } catch (err) {
      throw new Error(`Could not update Email. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<EmailsModel>(Emails, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Email. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<EmailsModel>(Emails, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Email. Error: ${err}`);
    }
  }
}
