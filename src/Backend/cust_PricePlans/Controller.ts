import { PricePlansModel, PricePlans } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByPricePlanID = async (pricePlanID: Number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_PricePlans] @language = :language, @Method = :Method, @pricePlanID = :pricePlanID';
  const replacements = { language: language, Method: 'GET_ByID', pricePlanID: pricePlanID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options)
  return result as unknown as PricePlansModel;
};

export class PricePlansController {
  async index(language: string, isActive: number): Promise<PricePlansModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_PricePlans] @language = :language, @Method = :Method, @isActive = :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = sequelize.query(query, options);
      return result as unknown as PricePlansModel[];
    } catch (err) {
      throw new Error(`Could not get all PricePlans. Error: ${err}`);
    }
  }

  async create(pricePlans: PricePlansModel | any): Promise<PricePlansModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PricePlans.bulkCreate(pricePlans,
          { transaction: t } // pass transaction object to query
        );
        return result as unknown as PricePlansModel;
      });
    } catch (err) {
      throw new Error(`Could not add new PricePlans. Error: ${err}`);
    }
  }

  async getPriceplanByPricePlanID(pricePlanID: number, language: string): Promise<PricePlansModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
        const item = await getByPricePlanID(pricePlanID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get PricePlans by ID. Error: ${err}`);
    }
  }

  async getPricePlanBySubAccountID(subAccountID: number, language: string): Promise<PricePlansModel | string> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_PricePlans] @language = :language, @Method = :Method, @subAccountID = :subAccountID';
      const replacements = { language: language, Method: 'GET_BySubAccountID', subAccountID: subAccountID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = sequelize.query(query, options);
      return result as unknown as PricePlansModel;
    } catch (err) {
      throw new Error(`Could not get PricePlans by subAccountID. Error: ${err}`);
    }
  }

  async getPricePlanMatrixBySubAccountID(subAccountID: number): Promise<PricePlansModel[] | string> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_PricePlans]  @Method = :Method, @subAccountID = :subAccountID';
      const replacements = { Method: 'GET_PricePlanMatrix', subAccountID: subAccountID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = sequelize.query(query, options);
      return result as unknown as PricePlansModel[];
    } catch (err) {
      throw new Error(`Could not get PricePlans matrix by subAccountID. Error: ${err}`);
    }
  }

  async update(pricePlans: PricePlansModel, language: string): Promise<PricePlansModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await PricePlans.update(
          {
            pricePlanID: pricePlans.pricePlanID,
            fromZoneID: pricePlans.fromZoneID,
            toZoneID: pricePlans.toZoneID,
            price: pricePlans.price,
            discount: pricePlans.discount,
            extraKilosStart: pricePlans.extraKilosStart,
            extraKilosFees: pricePlans.extraKilosFees,
            priceOnAll: pricePlans.priceOnAll,
          },
          {
            where: {
              ID: pricePlans.ID,
            },
            transaction: t // pass transaction object to query
          });

        const item = await getByPricePlanID(pricePlans.pricePlanID, t, language); // pass transaction object to getById function
        return item;
      });
    } catch (err) {
      throw new Error(`Could not update PricePlans. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<PricePlansModel>(PricePlans, 'pricePlanID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PricePlans. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<PricePlansModel>(PricePlans, 'pricePlanID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PricePlans. Error: ${err}`);
    }
  }
}
