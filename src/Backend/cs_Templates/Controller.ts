import { TemplatesModel, Templates } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';


const getById = (ID: number, t: Transaction, language?: string) => {

    const query = 'EXEC [dbo].[p_GET_cs_Templates] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options)
    return result as unknown as TemplatesModel;
}


export class TemplatesController {

    async index(language: string, isActive: number): Promise<TemplatesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cs_Templates] @language = :language, @Method = :Method, @isActive= :isActive';
            const replacements = { language: language, Method: 'GET', isActive: isActive };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TemplatesModel[];
        }
        catch (err) {
            throw new Error(`Could not get all Templates. Error: ${err}`);
        }
    }


    async create(template: TemplatesModel): Promise<TemplatesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Templates.create(
                    {
                        enMessage: template.enMessage,
                        arMessage: template.arMessage,
                        templateTypeID: template.templateTypeID,
                        Notes: template.Notes,
                        isActive: true,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not add new Template. Error: ${err}`);
        }
    }


    async getTemplateByID(ID: number, language: string): Promise<TemplatesModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        }
        catch (err) {
            throw new Error(`Could not get Template by ID. Error: ${err}`);
        }
    }

    async getTemplatesByTemplateTypeID(language: string, isActive: number, templateTypeID: number): Promise<TemplatesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cs_Templates] @language = :language, @Method = :Method, @isActive= :isActive, @templateTypeID= :templateTypeID';
            const replacements = { language: language, Method: 'GET_ByTemplateTypeID', isActive: isActive, templateTypeID: templateTypeID };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TemplatesModel[];
        }
        catch (err) {
            throw new Error(`Could not get Templates by Template Type ID. Error: ${err}`);
        }
    }


    async update(template: TemplatesModel, language: string): Promise<TemplatesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Templates.update(
                    {
                        enMessage: template.enMessage,
                        arMessage: template.arMessage,
                        templateTypeID: template.templateTypeID,
                        Notes: template.Notes,
                    },
                    {
                        where: {
                            ID: template.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const updatedTemplate = getById(template.ID, t, language);
                return updatedTemplate;
            });
        }
        catch (err) {
            throw new Error(`Could not update Template. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TemplatesModel>(Templates, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Template. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TemplatesModel>(Templates, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Template. Error: ${err}`);
        }
    }
}