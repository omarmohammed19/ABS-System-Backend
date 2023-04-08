import { Zones, ZonesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction, } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {

    const query = 'EXEC [dbo].[p_GET_cmp_Zones] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options)
    return result as unknown as ZonesModel;
}

export class ZonesController {
    async index(language: string, isActive: number): Promise<ZonesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cmp_Zones] @language = :language, @Method = :Method, @isActive = :isActive';
            const replacements = { language: language, Method: 'GET', isActive: isActive };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options)
            return result as unknown as ZonesModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Zones. Error: ${err}`);
        }
    }

    async create(zoneType: ZonesModel): Promise<ZonesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await Zones.create(
                    {
                        zoneName: zoneType.zoneName,
                        zoneTypeID: zoneType.zoneTypeID,
                        IsActive: true,
                    },
                    { transaction: t }
                );
                return result ? result.toJSON() : 'Could not create new Zone Type';
            });
        }
        catch (err) {
            throw new Error(`Could not add new Zone Type. Error: ${err}`);
        }
    }

    async getZoneByID(ID: number, language: string): Promise<ZonesModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not get Zone Type by ID. Error: ${err}`);
        }
    }

    async getZoneByZoneTypeID(zoneTypeID: number, language: string): Promise<ZonesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cmp_Zones] @language = :language, @Method = :Method, @zoneTypeID = :zoneTypeID';
            const replacements = { language: language, Method: 'GET_ByZoneTypeID', zoneTypeID: zoneTypeID };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, };
            const result = await sequelize.query(query, options);
            return result as unknown as ZonesModel[];
        }
        catch (err) {
            throw new Error(`Could not get Zone Type by ID. Error: ${err}`);
        }
    }

    async update(zone: ZonesModel, language: string): Promise<ZonesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Zones.update(
                    {
                        zoneName: zone.zoneName,
                        zoneTypeID: zone.zoneTypeID,
                    },
                    {
                        where: {
                            ID: zone.ID,
                        },
                        // fields: ['enContactLogType', 'arContactLogType', 'Notes'],
                        transaction: t // pass transaction object to query
                    }
                );
                const result = getById(Number(zone.ID), t, language);
                return result; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not update Zone. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<ZonesModel | string> {
        try {
            const result = await De_Activate<ZonesModel>(Zones, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Zone. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<ZonesModel | string> {
        try {
            const result = await De_Activate<ZonesModel>(Zones, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Zone. Error: ${err}`);
        }
    }


}
