import { CompanyData, companyDataModel } from "./Model";
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cmp_CompanyData] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as companyDataModel;
};

export class CompanyDataController {
    async index(language: string): Promise<companyDataModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cmp_CompanyData] @language = :language, @Method = :Method';
            const replacements = { language: language, Method: 'GET' };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as companyDataModel[];
        } catch (err) {
            throw new Error(`Could not get all companyData. Error: ${err}`);
        }
    }

    async create(companyData: companyDataModel): Promise<companyDataModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await CompanyData.create(
                    {
                        enCompanyName: companyData.enCompanyName,
                        arCompanyName: companyData.arCompanyName,
                        Website: companyData.Website,
                        enAddress: companyData.enAddress,
                        arAddress: companyData.arAddress,
                        Hotline: companyData.Hotline,
                        Telephone1: companyData.Telephone1,
                        Telephone2: companyData.Telephone2,
                        Telephone3: companyData.Telephone3,
                        isActive: true,
                    }, { transaction: t }
                );
                return result;
            });
        } catch (err) {
            throw new Error(`Could not add new companyData. Error: ${err}`);
        }
    }

    async getcompanyDataByID(ID: number, language: string): Promise<companyDataModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        } catch (err) {
            throw new Error(`Could not get companyData by ID. Error: ${err}`);
        }
    }

    async update(companyData: companyDataModel, language?: string): Promise<companyDataModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                await companyData.update(
                    {
                        enCompanyName: companyData.enCompanyName,
                        arCompanyName: companyData.arCompanyName,
                        Website: companyData.Website,
                        enAddress: companyData.enAddress,
                        arAddress: companyData.arAddress,
                        Hotline: companyData.Hotline,
                        Telephone1: companyData.Telephone1,
                        Telephone2: companyData.Telephone2,
                        Telephone3: companyData.Telephone3,
                    },
                    {
                        where: {
                            ID: companyData.ID,
                        },
                        transaction: t, // pass transaction object to query
                    }
                );
                const updatedCity = getById(companyData.ID, t, language);
                return updatedCity;
            });
        } catch (err) {
            throw new Error(`Could not update City. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<companyDataModel>(CompanyData, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate City. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<companyDataModel>(CompanyData, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate City. Error: ${err}`);
        }
    }
}

