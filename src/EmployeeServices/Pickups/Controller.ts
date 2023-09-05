import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getPickupsByBranchID = async (branchID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_PickupsForEmployee] @language = :language , @Method = :Method, @branchID = :branchID';
  const replacements = { language: language, Method: 'GET_PickupsByBranch', branchID: branchID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

export class PickupsController {
  async getPickupsByBranchID(branchID: number, language: string): Promise<any | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const item = await getPickupsByBranchID(branchID, language, t);
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Pickups by Branch ID. Error: ${err}`);
    }
  }
}
