import { PickupsModel } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';


export class PickupsController {


    async getHistoryPickups(language: string, isActive: number, subAccountID: number, limits?: number): Promise<PickupsModel[]> {
        const limit = limits || 10;
        try {
            const query = 'EXEC [dbo].[p_Pickups] @language = :language, @Method = :Method, @isActive= :isActive, @subAccountID= :subAccountID, @limit = :limit';
            const replacements = { language: language, Method: 'GET_HistoryPickups', isActive: isActive, subAccountID: subAccountID, limit: limit };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as PickupsModel[];
        }
        catch (err) {
            throw new Error(`Could not get History Pickups. Error: ${err}`);
        }
    }

    async getUpcomingPickups(language: string, isActive: number, subAccountID: number, limits?: number): Promise<PickupsModel[]> {
        const limit = limits || 10;
        try {
            const query = 'EXEC [dbo].[p_Pickups] @language = :language, @Method = :Method, @isActive= :isActive, @subAccountID= :subAccountID, @limit = :limit';
            const replacements = { language: language, Method: 'GET_UpcomingPickups', isActive: isActive, subAccountID: subAccountID, limit: limit };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as PickupsModel[];
        }
        catch (err) {
            throw new Error(`Could not get Upcoming Pickups. Error: ${err}`);
        }
    }
}