import { MessageStatus, MessageStatusModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enMessageStatusType', 'Notes'] : ['ID', 'arMessageStatusType', 'Notes'];
  return MessageStatus.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class MessageStatusController {
  async index(language: string): Promise<MessageStatusModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enMessageStatusType', 'Notes'] : ['ID', 'arMessageStatusType', 'Notes'];
        const result = await MessageStatus.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as MessageStatusModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all MessageStatus. Error: ${err}`);
    }
  }

  async create(messageStatus: MessageStatusModel): Promise<MessageStatusModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await MessageStatus.create(
          {
            enMessageStatusType: messageStatus.enMessageStatusType,
            arMessageStatusType: messageStatus.arMessageStatusType,
            Notes: messageStatus.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new MessageStatusType';
      });
    } catch (err) {
      throw new Error(`Could not add new MessageStatusType. Error: ${err}`);
    }
  }

  async getMessageStatusByID(language: string, ID: number): Promise<MessageStatusModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get MessageStatus by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get MessageStatusType by ID. Error: ${err}`);
    }
  }

  async update(messageStatus: MessageStatusModel): Promise<MessageStatusModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await MessageStatus.update(
          {
            enMessageStatusType: messageStatus.enMessageStatusType,
            arMessageStatusType: messageStatus.arMessageStatusType,
            Notes: messageStatus.Notes,
          },
          {
            where: {
              ID: messageStatus.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(messageStatus.ID), t);
        return result ? result.toJSON() : 'Could not update MessageStatus';
      });
    } catch (err) {
      throw new Error(`Could not update MessageStatus. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<MessageStatusModel>(MessageStatus, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate MessageStatusType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<MessageStatusModel>(MessageStatus, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate MessageStatusType. Error: ${err}`);
    }
  }
}
