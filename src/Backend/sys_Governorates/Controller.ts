import { GovernoratesModel, Governorates } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';


const getById = (ID: number, t: Transaction, language: string) => {

    const query = 'EXEC [dbo].[p_GET_sys_Governorates] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options)
    return result as unknown as GovernoratesModel;
}


export class GovernoratesController {

    async index(language: string, isActive: number): Promise<GovernoratesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_sys_Governorates] @language = :language, @Method = :Method, @isActive= :isActive';
            const replacements = { language: language, Method: 'GET', isActive: isActive };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as GovernoratesModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Governorates. Error: ${err}`);
        }
    }


    async create(governorate: GovernoratesModel): Promise<GovernoratesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Governorates.create(
                    {
                        enGovernorateName: governorate.enGovernorateName,
                        arGovernorateName: governorate.arGovernorateName,
                        countryID: governorate.countryID,
                        Notes: governorate.Notes,
                        isActive: true,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not add new Governorate. Error: ${err}`);
        }
    }


    async getGovernorateByID(ID: number, language: string): Promise<GovernoratesModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not get Governorate by ID. Error: ${err}`);
        }
    }

    async getGovernoratesByCountryID(language: string, isActive: number, countryID: number): Promise<GovernoratesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_sys_Governorates] @language = :language, @Method = :Method, @isActive= :isActive, @countryID= :countryID';
            const replacements = { language: language, Method: 'GET_ByCountryID', isActive: isActive, countryID: countryID };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as GovernoratesModel[];
        }
        catch (err) {
            throw new Error(`Could not get Governorates by Country ID. Error: ${err}`);
        }
    }

    async update(governorate: GovernoratesModel, language: string): Promise<GovernoratesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Governorates.update(
                    {
                        enGovernorateName: governorate.enGovernorateName,
                        arGovernorateName: governorate.arGovernorateName,
                        countryID: governorate.countryID,
                        Notes: governorate.Notes,
                    },
                    {
                        where: {
                            ID: governorate.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const updatedGovernorate = getById(governorate.ID, t, language);
                return updatedGovernorate;
            });
        }
        catch (err) {
            throw new Error(`Could not update Governorate. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<GovernoratesModel>(Governorates, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Governorate. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<GovernoratesModel>(Governorates, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Governorate. Error: ${err}`);
        }
    }
}