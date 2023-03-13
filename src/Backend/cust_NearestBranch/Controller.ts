import { NearestBranchModel, NearestBranch } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cust_NearestBranch] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = await sequelize.query(query, options)
    return result as unknown as NearestBranchModel;
}

export class NearestBranchController {
    async index(language: string): Promise<NearestBranchModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cust_NearestBranch] @language = :language, @Method = :Method';
            const replacements = { language: language, Method: 'GET' };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options)
            return result as unknown as NearestBranchModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Services. Error: ${err}`);
        }
    }

    async create(nearestBranch: NearestBranchModel): Promise<NearestBranchModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await NearestBranch.create(
                    {
                        branchID: nearestBranch.branchID,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new NearestBranch';
            });

        }
        catch (err) {
            throw new Error(`Could not add new NearestBranch. Error: ${err}`);
        }
    }

    async getNearestBranchById(ID: number, language: string): Promise<NearestBranchModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item;
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get NearestBranch by ID. Error: ${err}`);
        }
    }

    async update(services: NearestBranchModel, language: string): Promise<NearestBranchModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await NearestBranch.update(
                    {
                        branchID: services.branchID,
                    },
                    {
                        where: {
                            ID: services.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );

                const result = await getById(Number(services.ID), t, language); // pass transaction object to getById function
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not update NearestBranch. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<NearestBranchModel>(NearestBranch, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate NearestBranch. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<NearestBranchModel>(NearestBranch, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate NearestBranch. Error: ${err}`);
        }
    }
}
