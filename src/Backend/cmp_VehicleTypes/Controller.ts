import { VehicleTypes, VehicleTypesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string,) => {
    const attributes = (language === 'en') ? ['ID', 'enVehicleType', 'Notes'] : ['ID', 'arVehicleType', 'Notes'];
    return VehicleTypes.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            IsActive: true
        },
        transaction: t,
    });
}

export class VehicleTypesController {
    async index(language: string): Promise<VehicleTypesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                const attributes = (language === 'en') ? ['ID', 'enVehicleType', 'Notes'] : ['ID', 'arVehicleType', 'Notes'];
                const result = await VehicleTypes.findAll({
                    attributes: attributes,
                    where: {
                        IsActive: true
                    },
                    transaction: t
                });

                return result.map((item: any) => item.toJSON()) as VehicleTypesModel[];
            });
        }
        catch (err) {
            throw new Error(`Could not get all Vehicle Types. Error: ${err}`);
        }
    }

    async create(vehicleType: VehicleTypesModel): Promise<VehicleTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await VehicleTypes.create(
                    {
                        enVehicleType: vehicleType.enVehicleType,
                        arVehicleType: vehicleType.arVehicleType,
                        Notes: vehicleType.Notes,
                        IsActive: true,
                    },
                    { transaction: t }
                );
                return result ? result.toJSON() : 'Could not create new Vehicle Type';
            });
        }
        catch (err) {
            throw new Error(`Could not add new Vehicle Type. Error: ${err}`);
        }
    }

    async getVehicleTypeById(language: string, ID: number): Promise<VehicleTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                return result ? result.toJSON() : 'Could not get Vehicle Type';
            });
        }
        catch (err) {
            throw new Error(`Could not get Vehicle Type. Error: ${err}`);
        }
    }

    async update(vehicleTypes: VehicleTypesModel): Promise<VehicleTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await VehicleTypes.update(
                    {
                        enVehicleType: vehicleTypes.enVehicleType,
                        arVehicleType: vehicleTypes.arVehicleType,
                        Notes: vehicleTypes.Notes,

                    },
                    {
                        where: {
                            ID: vehicleTypes.ID,
                        },
                        // fields: ['enContactLogType', 'arContactLogType', 'Notes'],
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(vehicleTypes.ID), t);
                return result ? result.toJSON() : 'Could not update VehicleType'; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not update VehicleType. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<VehicleTypesModel | string> {
        try {
            const result = await De_Activate<VehicleTypesModel>(VehicleTypes, ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate VehicleType. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<VehicleTypesModel | string> {
        try {
            const result = await De_Activate<VehicleTypesModel>(VehicleTypes, ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate VehicleType. Error: ${err}`);
        }
    }
}