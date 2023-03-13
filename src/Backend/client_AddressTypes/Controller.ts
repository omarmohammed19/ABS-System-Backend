import { AddressTypesModel, AddressTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enAddressType', 'Notes'] : ['ID', 'arAddressType', 'Notes'];
  return AddressTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class AddressTypesController {
  async index(language: string): Promise<AddressTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enAddressType', 'Notes'] : ['ID', 'arAddressType', 'Notes'];
        const result = await AddressTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as AddressTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all AddressTypes. Error: ${err}`);
    }
  }

  async indexDeActivated(language: string): Promise<AddressTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enAddressType', 'Notes'] : ['ID', 'arAddressType', 'Notes'];
        const result = await AddressTypes.findAll({
          attributes: attributes,
          where: {
            isActive: false,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as AddressTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all AddressTypes. Error: ${err}`);
    }
  }

  async create(AddressType: AddressTypesModel): Promise<AddressTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await AddressTypes.create(
          {
            enAddressType: AddressType.enAddressType,
            arAddressType: AddressType.arAddressType,
            Notes: AddressType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new AddressType';
      });
    } catch (err) {
      throw new Error(`Could not add new AddressType. Error: ${err}`);
    }
  }

  async getAddressTypeByID(language: string, ID: number): Promise<AddressTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get AddressTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get AddressType by ID. Error: ${err}`);
    }
  }

  async update(AddressType: AddressTypesModel): Promise<AddressTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await AddressTypes.update(
          {
            enAddressType: AddressType.enAddressType,
            arAddressType: AddressType.arAddressType,
            Notes: AddressType.Notes,
          },
          {
            where: {
              ID: AddressType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(AddressType.ID), t);
        return result ? result.toJSON() : 'Could not update AddressTypes';
      });
    } catch (err) {
      throw new Error(`Could not update AddressTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<AddressTypesModel>(AddressTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate AddressType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<AddressTypesModel>(AddressTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate AddressType. Error: ${err}`);
    }
  }
}
