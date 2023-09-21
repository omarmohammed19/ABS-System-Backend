import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';

export class HomeController {
  async getStatusCountOfShipmentsBySubAccountID(subAccountID: number, language: String, fromDate?: Date, toDate?: Date): Promise<any> {
    try {
      const fromDates = fromDate || null;
      const toDates = toDate || null;
      const query =
        'EXEC [dbo].[p_GET_StatusCountOfShipments] @Method = :Method , @subAccountID= :subAccountID, @fromDate=:fromDates , @toDate=:toDates , @language=:language';
      const replacements = { Method: 'GET_BySubAccountID', subAccountID: subAccountID, fromDates: fromDates, toDates: toDates, language: language };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as any;
    } catch (err) {
      throw new Error(`Could not get Status Count. Error: ${err}`);
    }
  }

  async getStatusCountOfShipmentsByMainAccountID(mainAccountID: number, language: String, fromDate?: Date, toDate?: Date): Promise<any> {
    try {
      const fromDates = fromDate || null;
      const toDates = toDate || null;
      const query =
        'EXEC [dbo].[p_GET_StatusCountOfShipments] @Method = :Method , @mainAccountID= :mainAccountID, @fromDate=:fromDates , @toDate=:toDates , @language=:language';
      const replacements = { Method: 'GET_ByMainAccountID', mainAccountID: mainAccountID, fromDates: fromDates, toDates: toDates , language: language };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as any;
    } catch (err) {
      throw new Error(`Could not get Status Count. Error: ${err}`);
    }
  }

  async getPaid_NotPaidShipmentsCountBySubAccountID(subAccountID: number,  fromDate?: Date, toDate?: Date): Promise<any> {
    try {
      const fromDates = fromDate || null;
      const toDates = toDate || null;
      const query =
        'EXEC [dbo].[p_GET_Paid_NotPaid_ShipmentCount] @Method = :Method , @subAccountID= :subAccountID, @fromDate=:fromDates , @toDate=:toDates';
      const replacements = { Method: 'GET_BySubAccountID', subAccountID: subAccountID, fromDates: fromDates, toDates: toDates };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as any;
    } catch (err) {
      throw new Error(`Could not get Status Count. Error: ${err}`);
    }
  }

  async getPaid_NotPaidShipmentsCountByByMainAccountID(mainAccountID: number,  fromDate?: Date, toDate?: Date): Promise<any> {
    try {
      const fromDates = fromDate || null;
      const toDates = toDate || null;
      const query =
        'EXEC [dbo].[p_GET_Paid_NotPaid_ShipmentCount] @Method = :Method , @mainAccountID= :mainAccountID, @fromDate=:fromDates , @toDate=:toDates';
      const replacements = { Method: 'GET_ByMainAccountID', mainAccountID: mainAccountID, fromDates: fromDates, toDates: toDates };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as any;
    } catch (err) {
      throw new Error(`Could not get Status Count. Error: ${err}`);
    }
  }
}
