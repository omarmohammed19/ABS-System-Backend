import Sequelize from 'sequelize';
import { sequelize } from '../../Config/database';

export class CourierController {
    async getShipments(runnerID: number, statusID: number, language: string): Promise<any> {
        try {
            const result = await sequelize.transaction(async (t) => {
                const query = 'EXEC [dbo].[p_GET_shipment_For_Courier] @language = :language , @statusID = :statusID, @runnerID = :runnerID';
                const replacements = { language: language, statusID: statusID, runnerID: runnerID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options);
                return result as unknown as any;
            });
            return result;
        }
        catch (err) {
            throw new Error(`Could not get Shipments. Error: ${err}`);
        }
    }
}