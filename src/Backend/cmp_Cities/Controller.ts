import { CitiesModel, Cities } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cmp_Cities] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = sequelize.query(query, options);
  return result as unknown as CitiesModel;
};

export class CitiesController {
  async index(language: string, isActive: number): Promise<CitiesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cmp_Cities] @language = :language, @Method = :Method, @isActive= :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as CitiesModel[];
    } catch (err) {
      throw new Error(`Could not get all Cities. Error: ${err}`);
    }
  }

  async create(city: CitiesModel): Promise<CitiesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Cities.create(
          {
            enCityName: city.enCityName,
            arCityName: city.arCityName,
            runnerID: city.runnerID,
            branchID: city.branchID,
            governorateID: city.governorateID,
            zoneID: city.zoneID,
            Notes: city.Notes,
            isActive: true,
          },
          { transaction: t } // pass transaction object to query
        );
        return result; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not add new City. Error: ${err}`);
    }
  }

  async getCityByID(ID: number, language: string): Promise<CitiesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getById(ID, t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get City by ID. Error: ${err}`);
    }
  }

  async getCitiesByGovernorateID(language: string, isActive: number, governorateID: number): Promise<CitiesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cmp_Cities] @language = :language, @Method = :Method, @isActive= :isActive, @governorateID= :governorateID';
      const replacements = { language: language, Method: 'GET_ByGovernorateID', isActive: isActive, governorateID: governorateID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as CitiesModel[];
    } catch (err) {
      throw new Error(`Could not get Cities by Governorate ID. Error: ${err}`);
    }
  }

  async getCitiesByZoneID(language: string, isActive: number, zoneID: number): Promise<CitiesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cmp_Cities] @language = :language, @Method = :Method, @isActive= :isActive, @zoneID= :zoneID';
      const replacements = { language: language, Method: 'GET_ByZoneID', isActive: isActive, zoneID: zoneID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as CitiesModel[];
    } catch (err) {
      throw new Error(`Could not get Cities by Zone ID. Error: ${err}`);
    }
  }

  async update(city: CitiesModel, language: string): Promise<CitiesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Cities.update(
          {
            enCityName: city.enCityName,
            arCityName: city.arCityName,
            runnerID: city.runnerID,
            branchID: city.branchID,
            governorateID: city.governorateID,
            zoneID: city.zoneID,
            Notes: city.Notes,
          },
          {
            where: {
              ID: city.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const updatedCity = getById(city.ID, t, language);
        return updatedCity;
      });
    } catch (err) {
      throw new Error(`Could not update City. Error: ${err}`);
    }
  }

  async deActivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<CitiesModel>(Cities, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate City. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<CitiesModel>(Cities, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate City. Error: ${err}`);
    }
  }
}
