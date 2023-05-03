import { RoleTypesModel, RoleTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
    return RoleTypes.findOne({
        attributes: language === 'en' ? [['ID', 'RoleType ID'], ['enRoleType', 'Role Type']] : [['ID', 'رقم التسلسلي'], ['arRoleType', ' النوع']],
        where: {
            ID: ID,
            IsActive: true
        },
        transaction: t,
    });
}

export class RoleTypesController {
    async index(language: string, isActive: number): Promise<RoleTypesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await RoleTypes.findAll({
                    attributes: language === 'en' ? [['ID', 'RoleType ID'], ['enRoleType', 'Role Type']] : [['ID', 'رقم التسلسلي'], ['arRoleType', ' النوع']],
                    where: {
                        IsActive: isActive
                    },
                    transaction: t
                });
                return result.map((item: any) => item.toJSON()) as RoleTypesModel[];
            });
        }
        catch (err) {
            throw new Error(`Could not get all RoleTypes. Error: ${err}`);
        }
    }


    async create(roleType: RoleTypesModel): Promise<RoleTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await RoleTypes.create(
                    {
                        enRoleType: roleType.enRoleType,
                        arRoleType: roleType.arRoleType,
                        Notes: roleType.Notes,
                        IsActive: true,
                    },
                    { transaction: t }
                );
                return result ? result.toJSON() : 'Could not create new RoleType';
            });
        }
        catch (err) {
            throw new Error(`Could not add new RoleType. Error: ${err}`);
        }
    }

    async getRoleTypeByID(ID: number, language?: string): Promise<RoleTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await getById(ID, t, language);
                return result ? result.toJSON() : 'Could not get RoleType';
            });
        }
        catch (err) {
            throw new Error(`Could not get RoleType. Error: ${err}`);
        }
    }

    async update(roleType: RoleTypesModel, lang?: string): Promise<RoleTypesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await RoleTypes.update(
                    {
                        enRoleType: roleType.enRoleType,
                        arRoleType: roleType.arRoleType,
                        Notes: roleType.Notes,
                    },
                    {
                        where: {
                            ID: roleType.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(roleType.ID, t, lang);
                return result ? result.toJSON() : 'Could not update Language';
            });
        }
        catch (err) {
            throw new Error(`Could not update Role Type. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<RoleTypesModel>(RoleTypes, 'ID', ID, 'deactivate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not deactivate Role Type. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<RoleTypesModel>(RoleTypes, 'ID', ID, 'activate');
            return result;
        }
        catch (err) {
            throw new Error(`Could not activate Role Type. Error: ${err}`);
        }
    }
}



