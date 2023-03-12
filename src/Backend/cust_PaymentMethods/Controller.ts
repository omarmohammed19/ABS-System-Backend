import { PaymentMethodsModel, PaymentMethods } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: Number, t: Transaction, language?: string) => {
    const attributes = language === 'en' ? ['ID', 'enPaymentMethodType', 'Notes'] : ['ID', 'arPaymentMethodType', 'Notes'];
    return PaymentMethods.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class PaymentMethodsController {

    async index(language: string): Promise<PaymentMethodsModel[]> {
        try {
            const attributes = language === 'en' ? ['ID', 'enPaymentMethodType', 'Notes'] : ['ID', 'arPaymentMethodType', 'Notes'];
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await PaymentMethods.findAll({
                    attributes: attributes,
                    where: {
                        isActive: true,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as PaymentMethodsModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all PaymentMethods. Error: ${err}`);
        }
    }

    async create(paymentMethods: PaymentMethodsModel): Promise<PaymentMethodsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await PaymentMethods.create(
                    {
                        enPaymentMethodType: paymentMethods.enPaymentMethodType,
                        arPaymentMethodType: paymentMethods.arPaymentMethodType,
                        Notes: paymentMethods.Notes,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new PaymentMethods';
            });

        }
        catch (err) {
            throw new Error(`Could not add new PaymentMethods. Error: ${err}`);
        }
    }

    async getPaymentMethodsById(ID: number, language: string): Promise<PaymentMethodsModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t, language); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get PaymentMethods by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get PaymentMethods by ID. Error: ${err}`);
        }
    }

    async update(paymentMethods: PaymentMethodsModel): Promise<PaymentMethodsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await PaymentMethods.update(
                    {
                        enPaymentMethodType: paymentMethods.enPaymentMethodType,
                        arPaymentMethodType: paymentMethods.arPaymentMethodType,
                        Notes: paymentMethods.Notes,
                    },
                    {
                        where: {
                            ID: paymentMethods.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );

                const result = await getById(Number(paymentMethods.ID), t);
                return result ? result.toJSON() : 'Could not update PaymentMethods';
            });
        }
        catch (err) {
            throw new Error(`Could not update PaymentMethods. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = De_Activate<PaymentMethodsModel>(PaymentMethods, ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate PaymentMethods. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = De_Activate<PaymentMethodsModel>(PaymentMethods, ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate PaymentMethods. Error: ${err}`);
        }
    }
}
