import { EmailTypesModel, EmailTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enEmailType', 'Notes'] : ['ID', 'arEmailType', 'Notes'];
  return EmailTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class EmailTypesController {
  async index(language: string): Promise<EmailTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enEmailType', 'Notes'] : ['ID', 'arEmailType', 'Notes'];
        const result = await EmailTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as EmailTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all EmailTypes. Error: ${err}`);
    }
  }

  async indexDeActivated(language: string): Promise<EmailTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enEmailType', 'Notes'] : ['ID', 'arEmailType', 'Notes'];
        const result = await EmailTypes.findAll({
          attributes: attributes,
          where: {
            isActive: false,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as EmailTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all EmailTypes. Error: ${err}`);
    }
  }

  async create(EmailType: EmailTypesModel): Promise<EmailTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await EmailTypes.create(
          {
            enEmailType: EmailType.enEmailType,
            arEmailType: EmailType.arEmailType,
            Notes: EmailType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new EmailType';
      });
    } catch (err) {
      throw new Error(`Could not add new EmailType. Error: ${err}`);
    }
  }

  async getEmailTypesByID(language: string, ID: number): Promise<EmailTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get EmailTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get EmailType by ID. Error: ${err}`);
    }
  }

  async update(EmailType: EmailTypesModel): Promise<EmailTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await EmailTypes.update(
          {
            enEmailType: EmailType.enEmailType,
            arEmailType: EmailType.arEmailType,
            Notes: EmailType.Notes,
          },
          {
            where: {
              ID: EmailType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(EmailType.ID), t);
        return result ? result.toJSON() : 'Could not update EmailTypes';
      });
    } catch (err) {
      throw new Error(`Could not update EmailType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<EmailTypesModel>(EmailTypes, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate EmailType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<EmailTypesModel>(EmailTypes, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate EmailType. Error: ${err}`);
    }
  }
}
