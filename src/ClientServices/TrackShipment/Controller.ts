import { subAccount } from './../../../src2/Models2/subAccount';
import { TrackShipmentModel } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import { Transactions } from '../../Backend/ship_Transactions/Model';

export class TrackShipmentController {
  async getStatusByAWB(language: string, subAccountID: string, AWB: string): Promise<TrackShipmentModel[]> {
    try {
      const query = 'EXEC [dbo].[p_TrackShipment] @language = :language, @Method = :Method, @subAccountID = :subAccountID, @AWB= :AWB';
      const replacements = { language: language, Method: 'GET_LastStatusByAWB', subAccountID: subAccountID, AWB: AWB };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as TrackShipmentModel[];
    } catch (err) {
      throw new Error(`Could not get Status History by AWB. Error: ${err}`);
    }
  }

  async getAllStatusesByAWB(language: string, subAccountID: string, AWB: string): Promise<TrackShipmentModel[]> {
    try {
      const query = 'EXEC [dbo].[p_TrackShipment] @language = :language, @Method = :Method, @subAccountID = :subAccountID, @AWB= :AWB';
      const replacements = { language: language, Method: 'GET_AllStatusesByAWB', subAccountID: subAccountID, AWB: AWB };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as TrackShipmentModel[];
    } catch (err) {
      throw new Error(`Could not get Status History by AWB. Error: ${err}`);
    }
  }

  async checkAWBExistence(AWB: string, subAccountID: number): Promise<Boolean> {
    try {
      const result = await Transactions.findOne({
        where: {
          AWB: AWB,
          subAccountID: subAccountID,
          isActive: true,
        },
      });
      return result ? true : false;
    } catch (err) {
      throw new Error(`Could not check AWB Existence. Error: ${err}`);
    }
  }
}
