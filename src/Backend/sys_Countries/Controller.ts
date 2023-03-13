import { Countries, CountriesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction) => {
    const attributes = ['ID', 'countryName'];
    return Countries.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class CountriesController {

    async index(isActive: number): Promise<CountriesModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const attributes = ['ID', 'countryName'];
                const result = await Countries.findAll({
                    attributes: attributes,
                    where: {
                        isActive: isActive,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as CountriesModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all Countries. Error: ${err}`);
        }

    }

    async create(country: CountriesModel): Promise<CountriesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Countries.create(
                    {
                        countryName: country.countryName,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new Country';
            });

        }
        catch (err) {
            throw new Error(`Could not add new Country. Error: ${err}`);
        }
    }


    async getCountryByID(ID: number): Promise<CountriesModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get Country by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Country by ID. Error: ${err}`);
        }
    }

    async update(country: CountriesModel): Promise<CountriesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Countries.update(
                    {
                        countryName: country.countryName,
                    },
                    {
                        where: {
                            ID: country.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(country.ID), t);
                return result ? result.toJSON() : 'Could not update Country';
            });
        }
        catch (err) {
            throw new Error(`Could not update Country. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<CountriesModel>(Countries, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Country. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<CountriesModel>(Countries, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Country. Error: ${err}`);
        }
    }
}
