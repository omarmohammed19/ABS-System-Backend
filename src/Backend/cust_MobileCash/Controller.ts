import { MobileCashModel, MobileCash } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language: string) => {
  return MobileCash.findOne({
    attributes: language === 'en' ? [['ID', 'Mobile Cash ID'], ['mobileNumber', 'Mobile Number']] : [['ID', 'رقم التسلسل'], ['mobileNumber', 'رقم التليفون']],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class MobileCashController {
  async index(language: string, isActive: number, limit: number): Promise<MobileCashModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await MobileCash.findAll({
          attributes: language === 'en' ? [['ID', 'Mobile Cash ID'], ['mobileNumber', 'Mobile Number']] : [['ID', 'رقم التسلسل'], ['mobileNumber', 'رقم التليفون']],
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
          limit: limit
        });

        return result.map((item: any) => item.toJSON()) as MobileCashModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all MobileCash. Error: ${err}`);
    }
  }

  async create(mobileCash: MobileCashModel): Promise<MobileCashModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await MobileCash.create(
          {
            mobileNumber: mobileCash.mobileNumber,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new MobileCash';
      });
    } catch (err) {
      throw new Error(`Could not add new MobileCash. Error: ${err}`);
    }
  }

  async getMobileCashByID(ID: number, language: string): Promise<MobileCashModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get MobileCash by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get MobileCash by ID. Error: ${err}`);
    }
  }

  async getMobileCashBySubAccountID(subAccountID: number): Promise<MobileCashModel | string> {
    try {
      const query = 'EXEC [dbo].[p_cust_MobileCash] @Method = :Method, @subAccountID = :subAccountID';
      const replacements = { Method: 'GET_BySubAccountID', subAccountID: subAccountID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as MobileCashModel;
    }
    catch (err) {
      throw new Error(`Could not get MobileCash by SubAccountID. Error: ${err}`);
    }
  };

  async update(mobileCash: MobileCashModel, language: string): Promise<MobileCashModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await MobileCash.update(
          {
            mobileNumber: mobileCash.mobileNumber,
          },
          {
            where: {
              ID: mobileCash.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(mobileCash.ID), t, language);
        return result ? result.toJSON() : 'Could not update MobileCash';
      });
    } catch (err) {
      throw new Error(`Could not update MobileCash. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<MobileCashModel>(MobileCash, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate MobileCash. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<MobileCashModel>(MobileCash, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate MobileCash. Error: ${err}`);
    }
  }
}
