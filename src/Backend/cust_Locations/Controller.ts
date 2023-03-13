import { LocationsModel, Locations } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';
import Sequelize from 'sequelize';


const getById = async (ID: number, t: Transaction, language?: string): Promise<LocationsModel> => {
  const query = 'EXEC [dbo].[p_GET_cust_Locations] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as LocationsModel;
};

export class LocationsController {
  async index(language: string): Promise<LocationsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_Locations] @language = :language, @Method = :Method';
      const replacements = { language: language, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = sequelize.query(query, options);
      return result as unknown as LocationsModel[];
    } catch (err) {
      throw new Error(`Could not get all Addresses. Error: ${err}`);
    }
  }

  async create(locations: LocationsModel): Promise<LocationsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Locations.create(
          {
            locationName: locations.locationName,
            addressID: locations.addressID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Locations';
      });
    } catch (err) {
      throw new Error(`Could not add new Locations. Error: ${err}`);
    }
  }

  async getLocationsByID(ID: number, language: string): Promise<LocationsModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = await getById(ID, t, language);
        return result
      });
    } catch (err) {
      throw new Error(`Could not get Locations by ID. Error: ${err}`);
    }
  }


  async update(locations: LocationsModel): Promise<LocationsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Locations.update(
          {
            locationName: locations.locationName,
            addressID: locations.addressID,
          },
          {
            where: {
              ID: locations.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(locations.ID), t);
        return result ? result.toJSON() : 'Could not update Locations';
      });
    }
    catch (err) {
      throw new Error(`Could not update Locations. Error: ${err}`);
    }
  }


  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<LocationsModel>(Locations, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Locations. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<LocationsModel>(Locations, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Locations. Error: ${err}`);
    }
  }
}
