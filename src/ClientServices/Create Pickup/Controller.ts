import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';

export class CreatePickupController {
  async getPickup_ReturnLocationsBySubAccountID(locationType: string, subAccountID: number): Promise<any> {
    try {
      const query = 'EXEC [dbo].[p_GET_Pickup_Return_Locations]@locationType = :locationType, @subAccountID= :subAccountID';
      const replacements = { locationType: locationType, subAccountID: subAccountID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as any;
    } catch (err) {
      throw new Error(`Could not get Status Count. Error: ${err}`);
    }
  }
}
