import { TrackShipmentModel } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import { Transactions } from '../../Backend/ship_Transactions/Model';


export class TrackShipmentController {


    async getStatusByAWB(language: string, isActive: number, AWB: string): Promise<TrackShipmentModel[]> {
        try {
            const query = 'EXEC [dbo].[p_TrackShipment] @language = :language, @Method = :Method, @isActive= :isActive, @AWB= :AWB';
            const replacements = { language: language, Method: 'GET_ByAWB', isActive: isActive, AWB: AWB };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TrackShipmentModel[];
        }
        catch (err) {
            throw new Error(`Could not get Status History by AWB. Error: ${err}`);
        }
    }


    async checkAWBExistence(AWB: string): Promise<Boolean> {
        try {
            const result = await Transactions.findOne({
                where: {
                    AWB: AWB,
                    isActive: true,
                },
            });
            return result ? true : false;
        }
        catch (err){
            throw new Error(`Could not check AWB Existence. Error: ${err}`);
        }
    }
}