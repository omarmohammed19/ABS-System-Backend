import { ClientTypesModel, ClientTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enClientType', 'Notes'] : ['ID', 'arClientType', 'Notes'];
  return ClientTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ClientTypesController {
  async index(language: string): Promise<ClientTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enClientType', 'Notes'] : ['ID', 'arClientType', 'Notes'];
        const result = await ClientTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ClientTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ClientTypes. Error: ${err}`);
    }
  }

  async indexDeActivated(language: string): Promise<ClientTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enClientType', 'Notes'] : ['ID', 'arClientType', 'Notes'];
        const result = await ClientTypes.findAll({
          attributes: attributes,
          where: {
            isActive: false,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ClientTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ClientTypes. Error: ${err}`);
    }
  }

  async create(ClientType: ClientTypesModel): Promise<ClientTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ClientTypes.create(
          {
            enClientType: ClientType.enClientType,
            arClientType: ClientType.arClientType,
            Notes: ClientType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ClientType';
      });
    } catch (err) {
      throw new Error(`Could not add new ClientType. Error: ${err}`);
    }
  }

  async getClientTypesByID(language: string, ID: number): Promise<ClientTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ClientType by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ClientType by ID. Error: ${err}`);
    }
  }

  async update(ClientType: ClientTypesModel): Promise<ClientTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ClientTypes.update(
          {
            enClientType: ClientType.enClientType,
            arClientType: ClientType.arClientType,
            Notes: ClientType.Notes,
          },
          {
            where: {
              ID: ClientType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(ClientType.ID), t);
        return result ? result.toJSON() : 'Could not update ClientType';
      });
    } catch (err) {
      throw new Error(`Could not update ClientType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {

      const result = await De_Activate<ClientTypesModel>(ClientTypes, 'ID', ID, 'deactivate');

      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ClientType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {

      const result = await De_Activate<ClientTypesModel>(ClientTypes, 'ID', ID, 'activate');

      return result;
    } catch (err) {
      throw new Error(`Could not activate ClientType. Error: ${err}`);
    }
  }
}
