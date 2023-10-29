import { GendersModel, Genders } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    return Genders.findOne({
        attributes: language === 'en' ? ['ID', 'enGender'] : ['ID', 'arGender'],
        where: {
            ID: ID,
            IsActive: true
        },
        transaction: t,
    });
}

export class GenderController {
    async index(language: string, isActive: number): Promise<GendersModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await Genders.findAll({
                    attributes: language === 'en' ? ['ID', 'enGender'] : ['ID', 'arGender'],
                    where: {
                        IsActive: isActive
                    },
                    transaction: t
                });
                return result.map((item: any) => item.toJSON()) as GendersModel[];
            });
        }
        catch (err) {
            throw new Error(`Could not get all Genders. Error: ${err}`);
        }
    }


    async create(gender: GendersModel): Promise<GendersModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await Genders.create(
                    {
                        enGender: gender.enGender,
                        arGender: gender.arGender,
                        IsActive: true,
                    },
                    { transaction: t }
                );
                return result ? result.toJSON() : 'Could not create new Gender';
            });
        }
        catch (err) {
            throw new Error(`Could not add new Gender. Error: ${err}`);
        }
    }

    async getGenderByID(ID: number, language?: string): Promise<GendersModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                return result ? result.toJSON() : 'Could not get Gender';
            });
        }
        catch (err) {
            throw new Error(`Could not get Gender. Error: ${err}`);
        }
    }

    async update(gender: GendersModel, lang?: string): Promise<GendersModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Genders.update(
                    {
                        enGender: gender.enGender,
                        arGender: gender.arGender,
                    },
                    {
                        where: {
                            ID: gender.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(gender.ID, t, lang);
                return result ? result.toJSON() : 'Could not update Gender';
            });
        }
        catch (err) {
            throw new Error(`Could not update Gender. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<GendersModel>(Genders, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Gender. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<GendersModel>(Genders, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Gender. Error: ${err}`);
        }
    }
}