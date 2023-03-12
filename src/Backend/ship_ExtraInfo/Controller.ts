import { ExtraInfoModel, ExtraInfo } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (AWB: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_ExtraInfo] @Method = :Method, @AWB = :AWB';
  const replacements = { Method: 'GET_ByID', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as ExtraInfoModel;
};

export class ExtraInfoController {
  async index(): Promise<ExtraInfoModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_ExtraInfo] @Method = :Method';
      const replacements = { Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as ExtraInfoModel[];
    } catch (err) {
      throw new Error(`Could not get all ExtraInfo. Error: ${err}`);
    }
  }

  async create(extraInfo: ExtraInfoModel): Promise<ExtraInfoModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ExtraInfo.create(
          {
            AWB: extraInfo.AWB,
            Data1: extraInfo.Data1,
            Data2: extraInfo.Data2,
            Data3: extraInfo.Data3,
            Data4: extraInfo.Data4,
            Data5: extraInfo.Data5,
            Data6: extraInfo.Data6,
            Data7: extraInfo.Data7,
            Data8: extraInfo.Data8,
            Data9: extraInfo.Data9,
            Data10: extraInfo.Data10,
            Notes: extraInfo.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ExtraInfo';
      });
    } catch (err) {
      throw new Error(`Could not add new ExtraInfo. Error: ${err}`);
    }
  }

  async getExtraInfoById(AWB: string): Promise<ExtraInfoModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(AWB, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ExtraInfo by ID. Error: ${err}`);
    }
  }

  async update(extraInfo: ExtraInfoModel): Promise<ExtraInfoModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ExtraInfo.update(
          {
            AWB: extraInfo.AWB,
            Data1: extraInfo.Data1,
            Data2: extraInfo.Data2,
            Data3: extraInfo.Data3,
            Data4: extraInfo.Data4,
            Data5: extraInfo.Data5,
            Data6: extraInfo.Data6,
            Data7: extraInfo.Data7,
            Data8: extraInfo.Data8,
            Data9: extraInfo.Data9,
            Data10: extraInfo.Data10,
            Notes: extraInfo.Notes,
          },
          {
            where: {
              ID: extraInfo.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(extraInfo.AWB, t);
        return result ? result.toJSON() : 'Could not update ExtraInfo';
      });
    } catch (err) {
      throw new Error(`Could not update ExtraInfo. Error: ${err}`);
    }
  }

  async deactivate(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<ExtraInfoModel>(ExtraInfo, 'AWB', AWB, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ExtraInfo. Error: ${err}`);
    }
  }

  async activate(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<ExtraInfoModel>(ExtraInfo, 'AWB', AWB, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ExtraInfo. Error: ${err}`);
    }
  }
}
