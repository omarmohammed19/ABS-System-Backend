import { AddressesModel, Addresses } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (ID: number, t: Transaction, Method: string, subAccountID?: number, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_Addresses] @language = :language, @Method = :Method, @ID = :ID , @subAccountID = :subAccountID';
  const replacements = { language: language, Method: Method, ID: ID, subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as AddressesModel;
};

export class AddressesController {
  async index(language: string, limit: number, isActive: number): Promise<AddressesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_Addresses] @language = :language, @limit = :limit , @isActive = :isActive ,@Method = :Method';
      const replacements = { language: language, limit: limit, isActive: isActive, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as AddressesModel[];
    } catch (err) {
      throw new Error(`Could not get all Emails. Error: ${err}`);
    }
  }

  async create(Address: AddressesModel): Promise<AddressesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Addresses.create(
          {
            subAccountID: Address.subAccountID,
            streetName: Address.streetName,
            apartmentNumber: Address.apartmentNumber,
            floorNumber: Address.floorNumber,
            buildingNumber: Address.buildingNumber,
            cityID: Address.cityID,
            postalCode: Address.postalCode,
            addressTypeID: Address.addressTypeID,
            longitude: Address.longitude,
            latitude: Address.latitude,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Address';
      });
    } catch (err) {
      throw new Error(`Could not add new Address. Error: ${err}`);
    }
  }

  async getAddressesByID(ID: number, Method: string, subAccountID: number, language: string): Promise<AddressesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, t, Method, subAccountID, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Addresse by ID. Error: ${err}`);
    }
  }

  async update(Address: AddressesModel, language: string): Promise<AddressesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Addresses.update(
          {
            subAccountID: Address.subAccountID,
            streetName: Address.streetName,
            apartmentNumber: Address.apartmentNumber,
            floorNumber: Address.floorNumber,
            buildingNumber: Address.buildingNumber,
            cityID: Address.cityID,
            postalCode: Address.postalCode,
            addressTypeID: Address.addressTypeID,
            longitude: Address.longitude,
            latitude: Address.latitude,
          },
          {
            where: {
              ID: Address.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getByID(Number(Address.ID), t, language); // pass transaction object to getById function
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Addresses. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<AddressesModel>(Addresses, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Email. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<AddressesModel>(Addresses, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Email. Error: ${err}`);
    }
  }
}
