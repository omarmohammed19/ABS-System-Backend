import { BranchesModel, Branches } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enBranchName', 'cityID'] : ['ID', 'arBranchName', 'cityID'];
  return Branches.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class BranchesController {
  async index() {}

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
        return result.toJSON() as BranchesModel; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not add new Branch. Error: ${err}`);
    }
  }

  async getBranchById() {}

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
        const updatedBranch = await getById(branch.ID, t);
        return updatedBranch ? (updatedBranch.toJSON() as BranchesModel) : 'Branch not found';
      });
    } catch (err) {
      throw new Error(`Could not update Branch. Error: ${err}`);
    }
  }

  async deActivate(ID: Number): Promise<string> {
    try {
      const result = De_Activate<BranchesModel>(Branches, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Branch. Error: ${err}`);
    }
  }

  async activate(ID: Number): Promise<string> {
    try {
      const result = De_Activate<BranchesModel>(Branches, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Branch. Error: ${err}`);
    }
  }
}
