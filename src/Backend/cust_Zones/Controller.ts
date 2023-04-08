import { ZonesModel, Zones } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cust_Zones] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = await sequelize.query(query, options)
    return result as unknown as ZonesModel;
}

export class ZonesController {
    async index(language: string, isActive: number, limit: number): Promise<ZonesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cust_Zones] @language = :language, @Method = :Method, @isActive = :isActive, @limit = :limit';
            const replacements = { language: language, Method: 'GET', isActive: isActive, limit: limit };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options)
            return result as unknown as ZonesModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Zones. Error: ${err}`);
        }
    }

    async create(zones: ZonesModel): Promise<ZonesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Zones.create(
                    {
                        subAccountID: zones.subAccountID,
                        cityID: zones.cityID,
                        zoneID: zones.zoneID,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new Zones';
            });

        }
        catch (err) {
            throw new Error(`Could not add new Zones. Error: ${err}`);
        }
    }

    async getZonesById(ID: number, language: string): Promise<ZonesModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item;
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Zones by ID. Error: ${err}`);
        }
    }

    async getZonesBySubAccountId(subAccountID: number, language: string): Promise<ZonesModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const query = 'EXEC [dbo].[p_GET_cust_Zones] @language = :language, @Method = :Method, @subAccountID = :subAccountID';
                const replacements = { language: language, Method: 'GET_BySubAccountID', subAccountID: subAccountID };
                const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
                const result = await sequelize.query(query, options)
                return result as unknown as ZonesModel;
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Zones by Sub Account ID. Error: ${err}`);
        }
    }

    async update(zones: ZonesModel, language: string): Promise<ZonesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Zones.update(
                    {
                        subAccountID: zones.subAccountID,
                        cityID: zones.cityID,
                        zoneID: zones.zoneID,
                    },
                    {
                        where: {
                            ID: zones.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );

                const result = await getById(Number(zones.ID), t, language); // pass transaction object to getById function
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not update Zones. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {

            const result = await De_Activate<ZonesModel>(Zones, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Zones. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {

            const result = await De_Activate<ZonesModel>(Zones, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Zones. Error: ${err}`);
        }
    }
}
