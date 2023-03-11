import { BankDetailsModel, BankDetails } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: Number, t: Transaction) => {
    return BankDetails.findOne({
        attributes: ['ID', 'accountHolderName', 'accountNumber', 'bankNameID', 'IBAN', 'swiftCode'],
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class BankDetailsController {

    async index(): Promise<BankDetailsModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await BankDetails.findAll({
                    attributes: ['ID', 'accountHolderName', 'accountNumber', 'bankNameID', 'IBAN', 'swiftCode'],
                    where: {
                        isActive: true,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as BankDetailsModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all BankDetails. Error: ${err}`);
        }
    }

    async create(bankDetails: BankDetailsModel): Promise<BankDetailsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await BankDetails.create(
                    {
                        accountHolderName: bankDetails.accountHolderName,
                        accountNumber: bankDetails.accountNumber,
                        bankNameID: bankDetails.bankNameID,
                        IBAN: bankDetails.IBAN,
                        swiftCode: bankDetails.swiftCode,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new BankDetails';
            });

        }
        catch (err) {
            throw new Error(`Could not add new BankDetails. Error: ${err}`);
        }
    }

    async getBankDetialsById(ID: number): Promise<BankDetailsModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get BankDetails by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get BankDetails by ID. Error: ${err}`);
        }
    }

    async update(bankDetails: BankDetailsModel): Promise<BankDetailsModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await BankDetails.update(
                    {
                        accountHolderName: bankDetails.accountHolderName,
                        accountNumber: bankDetails.accountNumber,
                        bankNameID: bankDetails.bankNameID,
                        IBAN: bankDetails.IBAN,
                        swiftCode: bankDetails.swiftCode,
                    },
                    {
                        where: {
                            ID: bankDetails.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );

                const result = await getById(Number(bankDetails.ID), t);
                return result ? result.toJSON() : 'Could not update BankDetails';
            });
        }
        catch (err) {
            throw new Error(`Could not update BankDetails. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = De_Activate<BankDetailsModel>(BankDetails, ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate BankDetails. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = De_Activate<BankDetailsModel>(BankDetails, ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate BankDetails. Error: ${err}`);
        }
    }
}
