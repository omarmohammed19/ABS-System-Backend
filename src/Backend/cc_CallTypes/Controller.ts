import { CallTypes, CallTypesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  return CallTypes.findOne({
    attributes: language === 'en' ? ['ID', 'enCallType', 'Notes'] : [['ID', 'ID'], ['arCallType', 'نوع الاتصال'], ['Notes', 'ملحوظات']],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class CallTypesController {
  async index(language: string, isActive: number): Promise<CallTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await CallTypes.findAll({
          attributes: language === 'en' ? ['ID', 'enCallType', 'Notes'] : [['ID', 'ID'], ['arCallType', 'نوع الاتصال'], ['Notes', 'ملحوظات']],
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as CallTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all CallTypes. Error: ${err}`);
    }
  }

  async create(callType: CallTypesModel): Promise<CallTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await CallTypes.create(
          {
            enCallType: callType.enCallType,
            arCallType: callType.arCallType,
            Notes: callType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new CallType';
      });
    } catch (err) {
      throw new Error(`Could not add new CallType. Error: ${err}`);
    }
  }

  async getCallTypeByID(language: string, ID: number): Promise<CallTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get CallTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get CallType by ID. Error: ${err}`);
    }
  }

  async update(callType: CallTypesModel): Promise<CallTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await CallTypes.update(
          {
            enCallType: callType.enCallType,
            arCallType: callType.arCallType,
            Notes: callType.Notes,
          },
          {
            where: {
              ID: callType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(callType.ID), t);
        return result ? result.toJSON() : 'Could not update CallTypes';
      });
    } catch (err) {
      throw new Error(`Could not update CallTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<CallTypesModel>(CallTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate CallType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<CallTypesModel>(CallTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate CallType. Error: ${err}`);
    }
  }
}
