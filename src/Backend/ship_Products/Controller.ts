import { ProductsModel, Products } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enProduct', 'Notes'] : ['ID', 'arProduct', 'Notes'];
  return Products.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

const getProductBySubAccount = async (language: string, subAccountID: number, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_Products] @Method = :Method, @subAccountID = :subAccountID';
  const replacements = { language: language, Method: 'GET_BySubAccount', subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as ProductsModel[];
};

export class ProductsController {
  async index(language: string): Promise<ProductsModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enProduct', 'Notes'] : ['ID', 'arProduct', 'Notes'];
        const result = await Products.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ProductsModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all Products. Error: ${err}`);
    }
  }

  async getProductsBySubAccount(language: string, subAccountID: number): Promise<ProductsModel[]> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const products = await getProductBySubAccount(language, subAccountID, t);
        return products;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Products by SubAccount. Error: ${err}`);
    }
  }

  async create(products: ProductsModel): Promise<ProductsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Products.create(
          {
            enProduct: products.enProduct,
            arProduct: products.arProduct,
            requireIDNO: products.requireIDNO,
            Notes: products.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Products';
      });
    } catch (err) {
      throw new Error(`Could not add new Product. Error: ${err}`);
    }
  }

  async getProductById(language: string, ID: number): Promise<ProductsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get Products by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Product by ID. Error: ${err}`);
    }
  }

  async update(products: ProductsModel): Promise<ProductsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Products.update(
          {
            enProduct: products.enProduct,
            arProduct: products.arProduct,
            requireIDNO: products.requireIDNO,
            Notes: products.Notes,
          },
          {
            where: {
              ID: products.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(products.ID), t);
        return result ? result.toJSON() : 'Could not update Products';
      });
    } catch (err) {
      throw new Error(`Could not update Product. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ProductsModel>(Products, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Product. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ProductsModel>(Products, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Product. Error: ${err}`);
    }
  }
}
