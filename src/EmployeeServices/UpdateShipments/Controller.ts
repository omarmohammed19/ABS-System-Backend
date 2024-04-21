import Sequelize from 'sequelize';
import { sequelize } from '../../Config/database';

export class UpdateShipmentsController {
    async checkShipments(AWBs: String, language: string, newStatusID: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_Check_Update_Shipments] @language = :language , @AWBs = :AWBs , @newStatusID = :newStatusID';
                const replacements = { language: language, AWBs: AWBs, newStatusID: newStatusID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }

    async updateShipments(AWBs: String, language: string, newStatusID: number): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_Update_Shipments] @language = :language , @AWBs = :AWBs , @newStatusID = :newStatusID';
                const replacements = { language: language, AWBs: AWBs, newStatusID: newStatusID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Tickets. Error: ${err}`);
        }
    }
}