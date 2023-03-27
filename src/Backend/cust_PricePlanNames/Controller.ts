import { PricePlanNamesModel, PricePlanNames } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = async (ID: number, t: Transaction, language?: string) => {
    return await PricePlanNames.findOne({
        attributes: (language === 'en') ? [['ID', 'Price Plan Name ID'], ['enPricePlanName', 'Price Plan Name'], ['pricePlanID', 'Price Plan ID'], ['numberOfShipments', 'Number Of Shipments'], ['collectionStart', 'Collection Start'], ['collectionIncrement', 'Collection Increment'], ['collectionFees', 'Collection Fees'], ['basicPlan', 'Basic Plan'], ['defaultPlan', 'Default Plan'], 'Notes'] : [['ID', 'رقم التسلسل'], ['arPricePlanName', 'اسم خطة الاسعار'], ['pricePlanID', 'رقم خطة الاسعار'], ['numberOfShipments', 'عدد الشحنات'], ['collectionStart', 'بدء التحصيل'], ['collectionIncrement', 'التحصيل يزيد ب'], ['collectionFees', 'مصاريف التحصيل'], ['basicPlan', 'خطة اساسية'], ['defaultPlan', 'خطة افتراضية'], ['Notes', 'ملاحظات']],
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class PricePlanNamesController {
    async index(language: string, isActive: number): Promise<PricePlanNamesModel[]> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                const result = await PricePlanNames.findAll({
                    attributes: (language === 'en') ? [['ID', 'Price Plan Name ID'], ['enPricePlanName', 'Price Plan Name'], ['pricePlanID', 'Price Plan ID'], ['numberOfShipments', 'Number Of Shipments'], ['collectionStart', 'Collection Start'], ['collectionIncrement', 'Collection Increment'], ['collectionFees', 'Collection Fees'], ['basicPlan', 'Basic Plan'], ['defaultPlan', 'Default Plan'], 'Notes'] : [['ID', 'رقم التسلسل'], ['arPricePlanName', 'اسم خطة الاسعار'], ['pricePlanID', 'رقم خطة الاسعار'], ['numberOfShipments', 'عدد الشحنات'], ['collectionStart', 'بدء التحصيل'], ['collectionIncrement', 'التحصيل يزيد ب'], ['collectionFees', 'مصاريف التحصيل'], ['basicPlan', 'خطة اساسية'], ['defaultPlan', 'خطة افتراضية'], ['Notes', 'ملاحظات']],
                    where: {
                        isActive: isActive,
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

            const result = await De_Activate<PricePlanNamesModel>(PricePlanNames, 'ID', ID, 'deactivate');

            return result;
        } catch (err) {
            throw new Error(`Could not deactivate PricePlanNames. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {

            const result = await De_Activate<PricePlanNamesModel>(PricePlanNames, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate PricePlanNames. Error: ${err}`);
        }
    }
}
