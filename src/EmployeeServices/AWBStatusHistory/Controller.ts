import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, language: string, t: Transaction) => {
  const query = `EXEC [dbo].[p_GET_AWBStatusHistory] @Method = 'GET' , @AWB=:AWB , @language=:language`;
  const replacements = { AWB: AWB, language: language };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

export class AWBStatusHistoryController {
  async getAWBStatusHistory(AWB: string, language: string): Promise<any | string[]> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Transactions by ID. Error: ${err}`);
    }
  }
}
