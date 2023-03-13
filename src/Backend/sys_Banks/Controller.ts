import { Banks, BanksModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction) => {
    const attributes = ['ID', 'bankName'];
    return Banks.findOne({
        attributes: attributes,
        where: {
            ID: ID,
            isActive: true,
        },
        transaction: t // pass transaction object to query
    });
}

export class BanksController {

    async index(): Promise<BanksModel[]> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const attributes = ['ID', 'bankName'];
                const result = await Banks.findAll({
                    attributes: attributes,
                    where: {
                        isActive: true,
                    },
                    transaction: t // pass transaction object to query
                });

                return result.map((item: any) => item.toJSON()) as BanksModel[]; // return the result of the query (if successful) to be committed automatically
            });
        }
        catch (err) {
            throw new Error(`Could not get all Banks. Error: ${err}`);
        }

    }

    async create(bankName: BanksModel): Promise<BanksModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const result = await Banks.create(
                    {
                        bankName: bankName.bankName,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new Bank';
            });

        }
        catch (err) {
            throw new Error(`Could not add new Bank. Error: ${err}`);
        }
    }


    async getBankNameByID(ID: number): Promise<BanksModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                const item = await getById(ID, t); // pass transaction object to getById function
                return item ? item.toJSON() : 'Could not get Bank by ID';
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Bank by ID. Error: ${err}`);
        }
    }

    async update(bankName: BanksModel): Promise<BanksModel | string> {
        try {
            return await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
                await Banks.update(
                    {
                        bankName: bankName.bankName,
                    },
                    {
                        where: {
                            ID: bankName.ID,
                        },
                        transaction: t // pass transaction object to query
                    }
                );
                const result = await getById(Number(bankName.ID), t);
                return result ? result.toJSON() : 'Could not update Bank';
            });
        }
        catch (err) {
            throw new Error(`Could not update Bank. Error: ${err}`);
        }
    }


    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<BanksModel>(Banks, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Bank. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<BanksModel>(Banks, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate BankName. Error: ${err}`);
        }
    }
}
