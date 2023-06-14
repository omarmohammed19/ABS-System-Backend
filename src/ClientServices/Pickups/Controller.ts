import { PickupsModel } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';

export class PickupsController {
  async getHistoryPickups(language: string, subAccountID: number, limits?: number): Promise<PickupsModel[]> {
    const limit = limits || 10;
    try {
      const query = 'EXEC [dbo].[p_Pickups] @language = :language, @Method = :Method, @subAccountID= :subAccountID, @limit = :limit';
      const replacements = { language: language, Method: 'GET_HistoryPickups', subAccountID: subAccountID, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as PickupsModel[];
    } catch (err) {
      throw new Error(`Could not get History Pickups. Error: ${err}`);
    }
  }

  async getUpcomingPickups(language: string, subAccountID: number, limits?: number): Promise<PickupsModel[]> {
    const limit = limits || 10;
    try {
      const query = 'EXEC [dbo].[p_Pickups] @language = :language, @Method = :Method, @subAccountID= :subAccountID, @limit = :limit';
      const replacements = { language: language, Method: 'GET_UpcomingPickups', subAccountID: subAccountID, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as PickupsModel[];
    } catch (err) {
      throw new Error(`Could not get Upcoming Pickups. Error: ${err}`);
    }
  }

  async getAWBsByPickupID(language: string, subAccountID: number, PickupID: number): Promise<PickupsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_ship_Pickups] @language = :language, @Method = :Method, @subAccountID= :subAccountID, @PickupID = :PickupID';
      const replacements = { language: language, Method: 'GET_AWBsByPickupID', subAccountID: subAccountID, PickupID: PickupID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as PickupsModel[];
    } catch (err) {
      throw new Error(`Could not get AWBs of this Pickup. Error: ${err}`);
    }
  }
}
