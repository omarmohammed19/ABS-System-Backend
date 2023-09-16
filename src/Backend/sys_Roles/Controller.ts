import { Roles, RolesModel } from "./Model";
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_sys_Roles] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as RolesModel;
};

export class RolesController {
    async index(language: string): Promise<RolesModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_sys_Roles] @language = :language, @Method = :Method';
            const replacements = { language: language, Method: 'GET' };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as RolesModel[];
        } catch (err) {
            throw new Error(`Could not get all companyData. Error: ${err}`);
        }
    }

    async create(roles: RolesModel): Promise<RolesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await Roles.create(
                    {
                        enRoleName: roles.enRole,
                        arRoleName: roles.arRole,
                        roleTypeID: roles.roleTypeID,
                        isActive: true,
                    }, { transaction: t }
                );
                return result;
                //hi
            });
        } catch (err) {
            throw new Error(`Could not add new companyData. Error: ${err}`);
        }
    }

    async getRolesByID(ID: number, language: string): Promise<RolesModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        } catch (err) {
            throw new Error(`Could not get companyData by ID. Error: ${err}`);
        }
    }


    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<RolesModel>(Roles, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate City. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<RolesModel>(Roles, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate City. Error: ${err}`);
        }
    }

}




