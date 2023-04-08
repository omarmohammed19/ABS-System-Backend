import { News, NewsModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    return News.findOne({
        attributes: language === 'en' ? [['ID', 'News ID'], ['enNews', 'News']] : [['ID', 'رقم الخبر'], ['arNews', 'الخبر ']],
        where: {
            ID: ID,
            IsActive: true
        },
        transaction: t,
    });
}

export class NewsController {
    async index(language: string, isActive: number): Promise<NewsModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await News.findAll({
                    attributes: language === 'en' ? [['ID', 'News ID'], 'enNews'] : [['ID', 'رقم الخبر'], ['arNews', 'الخبر ']],
                    where: {
                        IsActive: isActive
                    },
                    transaction: t
                });
                return result.map((item: any) => item.toJSON()) as NewsModel[];
            });
        }
        catch (err) {
            throw new Error(`Could not get all News. Error: ${err}`);
        }
    }

    async create(news: NewsModel): Promise<NewsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await News.create(
                    {
                        enNews: news.enNews,
                        arNews: news.arNews,
                        IsActive: true,
                    },
                    { transaction: t }
                );
                return result ? result.toJSON() : 'Could not create new News';
            });
        }
        catch (err) {
            throw new Error(`Could not add new News. Error: ${err}`);
        }
    }

    async getNewsByID(ID: number, language?: string): Promise<NewsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                return result ? result.toJSON() : 'Could not get News';
            });
        }
        catch (err) {
            throw new Error(`Could not get News. Error: ${err}`);
        }
    }

    async update(news: NewsModel, language?: string): Promise<NewsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                await News.update(
                    {
                        enNews: news.enNews,
                        arNews: news.arNews,
                    },
                    {
                        where: {
                            ID: news.ID,
                        },
                        transaction: t
                    }
                );
                const result = await getById(news.ID, t, language);
                return result ? result.toJSON() : 'Could not update News';
            });
        }
        catch (err) {
            throw new Error(`Could not update News. Error: ${err}`);
        }
    }








    async deactivate(ID: number, language?: string): Promise<NewsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                if (result) {
                    const updated = await result.update(
                        {
                            IsActive: false,
                        },
                        { transaction: t }
                    );
                    return updated.toJSON();
                }
                return 'Could not deactivate News';
            });
        }
        catch (err) {
            throw new Error(`Could not deactivate News. Error: ${err}`);
        }
    }

    async activate(ID: number, language?: string): Promise<NewsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                if (result) {
                    const updated = await result.update(
                        {
                            IsActive: true,
                        },
                        { transaction: t }
                    );
                    return updated.toJSON();
                }
                return 'Could not activate News';
            });
        }
        catch (err) {
            throw new Error(`Could not activate News. Error: ${err}`);
        }
    }
}