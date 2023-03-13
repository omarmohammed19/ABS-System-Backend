import { PricePlanNamesModel, PricePlanNames } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: Number, t: Transaction, language?: string) => {
    const attributes = (language === 'en') ? ['ID', 'enPricePlanName', 'pricePlanID', 'numberOfShipments', 'collectionStart', 'collectionIncrement', 'collectionFees', 'basicPlan', 'defaultPlan', 'Notes'] : ['ID', 'arPricePlanName', 'pricePlanID', 'numberOfShipments', 'collectionStart', 'collectionIncrement', 'collectionFees', 'basicPlan', 'defaultPlan', 'Notes'];
    return await PricePlanNames.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class PricePlanNamesController {
    async index(language: string): Promise<PricePlanNamesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                const attributes = (language === 'en') ? ['ID', 'enPricePlanName', 'pricePlanID', 'numberOfShipments', 'collectionStart', 'collectionIncrement', 'collectionFees', 'basicPlan', 'defaultPlan', 'Notes'] : ['ID', 'arPricePlanName', 'pricePlanID', 'numberOfShipments', 'collectionStart', 'collectionIncrement', 'collectionFees', 'basicPlan', 'defaultPlan', 'Notes'];
                const result = await PricePlanNames.findAll({
                    attributes: attributes,
                    where: {
                        isActive: true,
                    },
                    transaction: t, // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as PricePlanNamesModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all PricePlanNames. Error: ${err}`);
        }
    }

    async indexDeActivated(language: string): Promise<PricePlanNamesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                const attributes = (language === 'en') ? ['ID', 'enPricePlanName', 'pricePlanID', 'numberOfShipments', 'collectionStart', 'collectionIncrement', 'collectionFees', 'basicPlan', 'defaultPlan', 'Notes'] : ['ID', 'arPricePlanName', 'pricePlanID', 'numberOfShipments', 'collectionStart', 'collectionIncrement', 'collectionFees', 'basicPlan', 'defaultPlan', 'Notes'];
                const result = await PricePlanNames.findAll({
                    attributes: attributes,
                    where: {
                        isActive: false,
                    },
                    transaction: t, // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as PricePlanNamesModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all PricePlanNames. Error: ${err}`);
        }
    }

    async create(pricePlanNames: PricePlanNamesModel): Promise<PricePlanNamesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await PricePlanNames.create(
                    {
                        enPricePlanName: pricePlanNames.enPricePlanName,
                        arPricePlanName: pricePlanNames.arPricePlanName,
                        pricePlanID: pricePlanNames.pricePlanID,
                        numberOfShipments: pricePlanNames.numberOfShipments,
                        collectionStart: pricePlanNames.collectionStart,
                        collectionIncrement: pricePlanNames.collectionIncrement,
                        collectionFees: pricePlanNames.collectionFees,
                        basicPlan: pricePlanNames.basicPlan,
                        defaultPlan: pricePlanNames.defaultPlan,
                        Notes: pricePlanNames.Notes,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new PricePlanNames';
            });

        }
        catch (err) {
            throw new Error(`Could not add new PricePlanNames. Error: ${err}`);
        }
    }

    async getPricePlanNameById(ID: number, language: string): Promise<PricePlanNamesModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item;
            });
            return result ? result.toJSON() : 'Could not get ContactLogTypes by ID';
        } catch (err) {
            throw new Error(`Could not get PricePlanNames by ID. Error: ${err}`);
        }
    }

    async update(pricePlanNames: PricePlanNamesModel, language: string): Promise<PricePlanNamesModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await PricePlanNames.update(
                    {
                        enPricePlanName: pricePlanNames.enPricePlanName,
                        arPricePlanName: pricePlanNames.arPricePlanName,
                        pricePlanID: pricePlanNames.pricePlanID,
                        numberOfShipments: pricePlanNames.numberOfShipments,
                        collectionStart: pricePlanNames.collectionStart,
                        collectionIncrement: pricePlanNames.collectionIncrement,
                        collectionFees: pricePlanNames.collectionFees,
                        basicPlan: pricePlanNames.basicPlan,
                        defaultPlan: pricePlanNames.defaultPlan,
                        Notes: pricePlanNames.Notes,
                    },
                    {
                        where: {
                            ID: pricePlanNames.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );

                const result = await getById(Number(pricePlanNames.ID), t, language); // pass transaction object to getById function
                return result ? result.toJSON() : 'Could not update PricePlanNames';
            });
        }
        catch (err) {
            throw new Error(`Could not update PricePlanNames. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = De_Activate<PricePlanNamesModel>(PricePlanNames'ID', ID, 'deactivate'');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate PricePlanNames. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = De_Activate<PricePlanNamesModel>(PricePlanNames, ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate PricePlanNames. Error: ${err}`);
        }
    }
}
