import { AddressesModel, Addresses } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cnee_Addresses] @language = :language, @Method = :Method, @AWB = :AWB';
  const replacements = { language: language, Method: 'GET_ByID', AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as AddressesModel;
};

export class AddressesController {
  async index(language: string, limit: number, isActive: number): Promise<AddressesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cnee_Addresses] @language = :language, @limit= :limit, @isActive = :isActive ,@Method = :Method';
      const replacements = { language: language, limit: limit, isActive: isActive, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as AddressesModel[];
    } catch (err) {
      throw new Error(`Could not get all Addresses. Error: ${err}`);
    }
  }

  async create(address: AddressesModel): Promise<AddressesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Addresses.create(
          {
            AWB: address.AWB,
            subAccountID: address.subAccountID,
            streetName: address.streetName,
            apartmentNumber: address.apartmentNumber,
            floorNumber: address.floorNumber,
            buildingNumber: address.buildingNumber,
            cityID: address.cityID,
            postalCode: address.postalCode,
            cneeContactPersonID: address.cneeContactPersonID,
            longitude: address.longitude,
            latitude: address.latitude,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Address';
      });
    } catch (err) {
      throw new Error(`Could not add new Address. Error: ${err}`);
    }
  }

  async getServicesById(AWB: string, language: string): Promise<AddressesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Addresses by ID. Error: ${err}`);
    }
  }

  async update(address: AddressesModel, language: string): Promise<AddressesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Addresses.update(
          {
            subAccountID: address.subAccountID,
            streetName: address.streetName,
            apartmentNumber: address.apartmentNumber,
            floorNumber: address.floorNumber,
            buildingNumber: address.buildingNumber,
            cityID: address.cityID,
            postalCode: address.postalCode,
            cneeContactPersonID: address.cneeContactPersonID,
            longitude: address.longitude,
            latitude: address.latitude,
          },
          {
            where: {
              AWB: address.AWB,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getByAWB(String(address.AWB), t, language); // pass transaction object to getById function
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update Addresses. Error: ${err}`);
    }
  }

  async deactivate(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<AddressesModel>(Addresses, 'AWB', AWB, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Addresses. Error: ${err}`);
    }
  }

  async activate(AWB: string): Promise<string> {
    try {
      const result = await De_Activate<AddressesModel>(Addresses, 'AWB', AWB, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Addresses. Error: ${err}`);
    }
  }
}
