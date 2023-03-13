import { LanguagesModel, Languages } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    return Languages.findOne({
        attributes: language === 'en' ? [['ID', 'Language ID'], 'Language'] : [['ID', 'رقم اللغة'], ['Language', 'اسم اللغة']],
        where: {
            ID: ID,
            IsActive: true
        },
        transaction: t,
    });
}

export class LanguagesController {
    async index(language: string): Promise<LanguagesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await Languages.findAll({
                    attributes: language === 'en' ? [['ID', 'Language ID'], 'Language'] : [['ID', 'رقم اللغة'], ['Language', 'اسم اللغة']],
                    where: {
                        IsActive: true
                    },
                    transaction: t
                });
                return result.map((item: any) => item.toJSON()) as LanguagesModel[];
            });
        }
        catch (err) {
            throw new Error(`Could not get all Languages. Error: ${err}`);
        }
    }


    async create(language: LanguagesModel): Promise<LanguagesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await Languages.create(
                    {
                        Language: language.Language,
                        IsActive: true,
                    },
                    { transaction: t }
                );
                return result ? result.toJSON() : 'Could not create new Language';
            });
        }
        catch (err) {
            throw new Error(`Could not add new Language. Error: ${err}`);
        }
    }

    async getLanguageByID(ID: number, language?: string): Promise<LanguagesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                return result ? result.toJSON() : 'Could not get Language';
            });
        }
        catch (err) {
            throw new Error(`Could not get Language. Error: ${err}`);
        }
    }

    async update(language: LanguagesModel, lang?: string): Promise<LanguagesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Languages.update(
                    {
                        Language: language.Language,
                    },
                    {
                        where: {
                            ID: language.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(language.ID, t, lang);
                return result ? result.toJSON() : 'Could not update Language';
            });
        }
        catch (err) {
            throw new Error(`Could not update Branch. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<LanguagesModel>(Languages, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Branch. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<LanguagesModel>(Languages, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Branch. Error: ${err}`);
        }
    }
}