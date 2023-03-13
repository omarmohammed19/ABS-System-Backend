import { ZoneTypes, ZoneTypesModel } from '../cmp_ZoneTypes/Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction, } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    const attributes = (language === 'en') ? ['ID', 'enZoneType', 'Notes'] : ['ID', 'arZoneType', 'Notes'];
    return ZoneTypes.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            IsActive: true
        },
        transaction: t,
    });
}

export class ZoneTypesController {
    async index(language: string): Promise<ZoneTypesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                const attributes = (language === 'en') ? ['ID', 'enZoneType', 'Notes'] : ['ID', 'arZoneType', 'Notes'];
                const result = await ZoneTypes.findAll({
                    attributes: attributes,
                    where: {
                        IsActive: true
                    },
                    transaction: t
                });
                return result.map((item: any) => item.toJSON()) as ZoneTypesModel[];
            });
        }
        catch (err) {
            throw new Error(`Could not get all Zone Types. Error: ${err}`);
        }
    }

    async create(zoneType: ZoneTypesModel): Promise<ZoneTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await ZoneTypes.create(
                    {
                        enZoneType: zoneType.enZoneType,
                        arZoneType: zoneType.arZoneType,
                        Notes: zoneType.Notes,
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

    async getZoneTypeByID(ID: number, language?: string,): Promise<ZoneTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const attributes = (language === 'en') ? ['ID', 'enZoneType', 'Notes'] : ['ID', 'arZoneType', 'Notes'];
                const result = await ZoneTypes.findOne({
                    attributes: attributes,
                    where: {
                        ID: ID,
                        IsActive: true
                    },
                    transaction: t,
                });
                return result ? result.toJSON() : 'Could not get Zone Type';
            });
        }
        catch (err) {
            throw new Error(`Could not get Zone Type. Error: ${err}`);
        }
    }


    async update(zoneTypes: ZoneTypesModel): Promise<ZoneTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await ZoneTypes.update(
                    {
                        enZoneType: zoneTypes.enZoneType,
                        arZoneType: zoneTypes.arZoneType,
                        Notes: zoneTypes.Notes,
                    },
                    {
                        where: {
                            ID: zoneTypes.ID,
                        },
                        // fields: ['enContactLogType', 'arContactLogType', 'Notes'],
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(zoneTypes.ID), t);
                return result ? result.toJSON() : 'Could not update VehicleType'; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not update VehicleType. Error: ${err}`);
        }
    }



    async deactivate(ID: number): Promise<ZoneTypesModel | string> {
        try {
            const result = await De_Activate<ZoneTypesModel>(ZoneTypes, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate VehicleType. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<ZoneTypesModel | string> {
        try {
            const result = await De_Activate<ZoneTypesModel>(ZoneTypes, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate VehicleType. Error: ${err}`);
        }
    }
}

