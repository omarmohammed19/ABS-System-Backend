import { SalesChannelTypesModel, SalesChannelTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: Number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enSalesChannelType', 'Notes'] : ['ID', 'arSalesChannelType', 'Notes'];
  return SalesChannelTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class SalesChannelTypesController {
  async index(language: string): Promise<SalesChannelTypesModel[]> {
    try {
      const attributes = language === 'en' ? ['ID', 'enSalesChannelType', 'Notes'] : ['ID', 'arSalesChannelType', 'Notes'];
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await SalesChannelTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as SalesChannelTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all SalesChannelTypes. Error: ${err}`);
    }
  }

  async create(salesChannelTypes: SalesChannelTypesModel): Promise<SalesChannelTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await SalesChannelTypes.create(
          {
            enSalesChannelType: salesChannelTypes.enSalesChannelType,
            arSalesChannelType: salesChannelTypes.arSalesChannelType,
            Notes: salesChannelTypes.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new SalesChannelTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new SalesChannelTypes. Error: ${err}`);
    }
  }

  async getSalesChannelTypesById(ID: number, language: string): Promise<SalesChannelTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get SalesChannelTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get SalesChannelTypes by ID. Error: ${err}`);
    }
  }

  async update(salesChannelTypes: SalesChannelTypesModel): Promise<SalesChannelTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await SalesChannelTypes.update(
          {
            enSalesChannelType: salesChannelTypes.enSalesChannelType,
            arSalesChannelType: salesChannelTypes.arSalesChannelType,
            Notes: salesChannelTypes.Notes,
          },
          {
            where: {
              ID: salesChannelTypes.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(salesChannelTypes.ID), t);
        return result ? result.toJSON() : 'Could not update SalesChannelTypes';
      });
    } catch (err) {
      throw new Error(`Could not update SalesChannelTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SalesChannelTypesModel>(SalesChannelTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate SalesChannelTypes. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SalesChannelTypesModel>(SalesChannelTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate SalesChannelTypes. Error: ${err}`);
    }
  }
}
