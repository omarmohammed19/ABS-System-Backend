import { InfoModel, Info } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string,) => {
    const attributes = (language === 'en') ? ['ID', 'enCompanyName'] : ['ID', 'arCompanyName'];
    return Info.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class InfoController {

    async index(language: string): Promise<InfoModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const attributes = (language === 'en') ? ['ID', 'enCompanyName'] : ['ID', 'arCompanyName'];
                const result = await Info.findAll({
                    attributes: attributes,
                    where: {
                        isActive: true,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as InfoModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all Info. Error: ${err}`);
        }
    }

    async create(info: InfoModel): Promise<InfoModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Info.create(
                    {
                        enCompanyName: info.enCompanyName,
                        arCompanyName: info.arCompanyName,
                        isActive: true,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not create new Info'; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not add new Info. Error: ${err}`);
        }
    }


    async getInfoById(language: string, ID: number): Promise<InfoModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get Info by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Info by ID. Error: ${err}`);
        }
    }

    async update(info: InfoModel): Promise<InfoModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Info.update(
                    {
                        enCompanyName: info.enCompanyName,
                        arCompanyName: info.arCompanyName,

                    },
                    {
                        where: {
                            ID: info.ID,
                        },
                        // fields: ['enContactLogType', 'arContactLogType', 'Notes'],
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(info.ID), t);
                return result ? result.toJSON() : 'Could not update Info'; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not update Info. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<InfoModel | string> {
        try {
            const result = await De_Activate<InfoModel>(Info, ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Info. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<InfoModel | string> {
        try {
            const result = await De_Activate<InfoModel>(Info, ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Info. Error: ${err}`);
        }
    }

}
