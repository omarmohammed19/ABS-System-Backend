import { ServicesModel, Services } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: Number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cust_Services] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = await sequelize.query(query, options)
    return result as unknown as ServicesModel;
}

export class ServicesController {
    async index(language: string): Promise<ServicesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cust_Services] @language = :language, @Method = :Method';
            const replacements = { language: language, Method: 'GET' };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = sequelize.query(query, options)
            return result as unknown as ServicesModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Services. Error: ${err}`);
        }
    }

    async create(services: ServicesModel): Promise<ServicesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Services.create(
                    {
                        subAccountID: services.subAccountID,
                        serviceTypeID: services.serviceTypeID,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new Services';
            });

        }
        catch (err) {
            throw new Error(`Could not add new Services. Error: ${err}`);
        }
    }

    async getServicesById(ID: number, language: string): Promise<ServicesModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item;
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Services by ID. Error: ${err}`);
        }
    }

    async update(services: ServicesModel, language:string): Promise<ServicesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Services.update(
                    {
                        subAccountID: services.subAccountID,
                        serviceTypeID: services.serviceTypeID,
                    },
                    {
                        where: {
                            ID: services.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );

                const result = await getById(Number(services.ID), t,language); // pass transaction object to getById function
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not update Services. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = De_Activate<ServicesModel>(Services, ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Services. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = De_Activate<ServicesModel>(Services, ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Services. Error: ${err}`);
        }
    }
}
