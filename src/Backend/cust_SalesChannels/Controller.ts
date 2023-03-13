import { SalesChannelsModel, SalesChannels } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_SalesChannels] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options)
  return result as unknown as SalesChannelsModel;
}

export class SalesChannelsController {

  async index(language: string): Promise<SalesChannelsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_SalesChannels] @language = :language, @Method = :Method';
      const replacements = { language: language, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options)
      return result as unknown as SalesChannelsModel[];
    }
    catch (err) {
      throw new Error(`Could not get all SalesChannels. Error: ${err}`);
    }
  }

  async indexDeActivated(language: string): Promise<SalesChannelsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_SalesChannels] @language = :language, @Method = :Method';
      const replacements = { language: language, Method: 'GET_DeActivated' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options)
      return result as unknown as SalesChannelsModel[];
    }
    catch (err) {
      throw new Error(`Could not get all SalesChannels. Error: ${err}`);
    }
  }

  async create(salesChannels: SalesChannelsModel): Promise<SalesChannelsModel | string> {
    try {
      return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
        const result = await SalesChannels.create(
          {
            cmpInfoID: salesChannels.cmpInfoID,
            salesChannelName: salesChannels.salesChannelName,
            salesChannelURL: salesChannels.salesChannelURL,
            salesChannelTypeID: salesChannels.salesChannelTypeID
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new SalesChannels';
      });

    }
    catch (err) {
      throw new Error(`Could not add new SalesChannels. Error: ${err}`);
    }
  }

  async getSubAccountsById(ID: number, language: string): Promise<SalesChannelsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get SalesChannels by ID. Error: ${err}`);
    }
  }

  async update(salesChannels: SalesChannelsModel, language: string): Promise<SalesChannelsModel | string> {
    try {
      return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
        await SalesChannels.update(
          {
            cmpInfoID: salesChannels.cmpInfoID,
            salesChannelName: salesChannels.salesChannelName,
            salesChannelURL: salesChannels.salesChannelURL,
            salesChannelTypeID: salesChannels.salesChannelTypeID
          },
          {
            where: {
              ID: salesChannels.ID,
            },
            transaction: t // pass transaction object to query
          });

        const item = await getById(salesChannels.ID, t, language); // pass transaction object to getById function
        return item;
      });
    }
    catch (err) {
      throw new Error(`Could not update SalesChannels. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SalesChannelsModel>(SalesChannels, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate SalesChannels. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SalesChannelsModel>(SalesChannels, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate SalesChannels. Error: ${err}`);
    }
  }
}
