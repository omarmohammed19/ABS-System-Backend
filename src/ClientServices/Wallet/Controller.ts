import { WalletModel, Shipments } from './Model';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';

export class WalletController {

    async getABSFees(subAccountID: number, fromDate: Date, toDate: Date): Promise<WalletModel> {
        try {
            const fromDates = fromDate || null;
            const toDates = toDate || null;
            const query = 'EXEC [dbo].[p_GET_ABS_Fees_BySubAccountID] @subAccountID= :subAccountID, @fromDate=:fromDate , @toDate=:toDate';
            const replacements = { subAccountID: subAccountID, fromDate: fromDates, toDate: toDates };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as WalletModel;
        }
        catch (err) {
            console.log(err);
            throw new Error(`Could not get ABS Fees. Error: ${err}`);
        }
    }

    async getCash(Method: string, subAccountID: number, fromDate?: Date, toDate?: Date): Promise<WalletModel> {
        try {
            const fromDates = fromDate || null;
            const toDates = toDate || null;
            const query = 'EXEC [dbo].[p_Total_Cash_BySubAccountID] @fromDate=:fromDates , @toDate=:toDates, @Method= :Method, @subAccountID= :subAccountID ';
            const replacements = { fromDates: fromDates, toDates: toDates, Method: Method, subAccountID: subAccountID };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as WalletModel;
        }
        catch (err) {
            throw new Error(`Could not get Paid Cash. Error: ${err}`);
        }
    }

    async getShipments(limit: number, language: string, subAccountID: number, fromDate?: Date, toDate?: Date): Promise<Shipments> {
        try {
            const fromDates = fromDate || null;
            const toDates = toDate || null;
            const query = 'EXEC [dbo].[p_GET_Delivered_Paid_Shipments] @Method=:Method, @limit=:limit, @language=:language, @fromDate=:fromDates , @toDate=:toDates, @subAccountID= :subAccountID ';
            const replacements = { Method: 'Get_All', fromDates: fromDates, toDates: toDates, limit: limit, language: language, subAccountID: subAccountID };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as Shipments;
        }
        catch (err) {
            throw new Error(`Could not get Shipments. Error: ${err}`);
        }
    }

    async getShipmentByAWB(language: string, subAccountID: number, AWB: string): Promise<Shipments> {
        try {
            
            const query = 'EXEC [dbo].[p_GET_Delivered_Paid_Shipments] @Method=:Method, @language=:language, @subAccountID= :subAccountID , @AWB= :AWB';
            const replacements = { Method: 'Get_By_Awb', language: language, subAccountID: subAccountID, AWB: AWB };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result[0] as unknown as Shipments;
        }
        catch (err) {
            throw new Error(`Could not get Shipments. Error: ${err}`);
        }
    }
}