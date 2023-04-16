import { BranchesModel, Branches } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cmp_Branches] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = sequelize.query(query, options);
  return result as unknown as BranchesModel;
};

const getBracnhByCityId = (cityID: number) => {
  const query = 'EXEC [dbo].[p_GET_cmp_Branches]  @Method = :Method, @cityID = :cityID';
  const replacements = { Method: 'GET_BranchIDByCityID', cityID: cityID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  const result = sequelize.query(query, options);
  return result as unknown as BranchesModel;
};

export class BranchesController {
  async index(language: string, isActive: number): Promise<BranchesModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cmp_Branches] @language = :language, @Method = :Method, @isActive = :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as BranchesModel[];
    } catch (err) {
      throw new Error(`Could not get all Branches. Error: ${err}`);
    }
  }

  async create(branch: BranchesModel): Promise<BranchesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Branches.create(
          {
            enBranchName: branch.enBranchName,
            arBranchName: branch.arBranchName,
            cityID: branch.cityID,
            isActive: true,
          },
          { transaction: t } // pass transaction object to query
        );
        return result; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not add new Branch. Error: ${err}`);
    }
  }

  async getBranchByID(ID: number, language: string): Promise<BranchesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getById(ID, t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get Zone Type by ID. Error: ${err}`);
    }
  }

  async getBranchByCityID(cityID: number): Promise<BranchesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getBracnhByCityId(cityID);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get Zone Type by ID. Error: ${err}`);
    }
  }

  async update(branch: BranchesModel): Promise<BranchesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Branches.update(
          {
            enBranchName: branch.enBranchName,
            arBranchName: branch.arBranchName,
            cityID: branch.cityID,
          },
          {
            where: {
              ID: branch.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const updatedBranch = getById(branch.ID, t);
        return updatedBranch;
      });
    } catch (err) {
      throw new Error(`Could not update Branch. Error: ${err}`);
    }
  }

  async deActivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<BranchesModel>(Branches, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Branch. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<BranchesModel>(Branches, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Branch. Error: ${err}`);
    }
  }
}
