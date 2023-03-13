import { WalletDetailsModel, WalletDetails } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: Number, t: Transaction) => {
  return WalletDetails.findOne({
    attributes: ['ID', 'walletNumber', 'mobileNumber'],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class WalletDetailsController {
  async index(): Promise<WalletDetailsModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await WalletDetails.findAll({
          attributes: ['ID', 'walletNumber', 'mobileNumber'],
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as WalletDetailsModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all WalletDetails. Error: ${err}`);
    }
  }

  async create(walletDetails: WalletDetailsModel): Promise<WalletDetailsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await WalletDetails.create(
          {
            walletNumber: walletDetails.walletNumber,
            mobileNumber: walletDetails.mobileNumber,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new WalletDetails';
      });
    } catch (err) {
      throw new Error(`Could not add new WalletDetails. Error: ${err}`);
    }
  }

  async getWalletDetailsByID(ID: number): Promise<WalletDetailsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get WalletDetails by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get WalletDetails by ID. Error: ${err}`);
    }
  }

  async update(walletDetails: WalletDetailsModel): Promise<WalletDetailsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await WalletDetails.update(
          {
            walletNumber: walletDetails.walletNumber,
            mobileNumber: walletDetails.mobileNumber,
          },
          {
            where: {
              ID: walletDetails.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(walletDetails.ID), t);
        return result ? result.toJSON() : 'Could not update WalletDetails';
      });
    } catch (err) {
      throw new Error(`Could not update WalletDetails. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<WalletDetailsModel>(WalletDetails, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate WalletDetails. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<WalletDetailsModel>(WalletDetails, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate WalletDetails. Error: ${err}`);
    }
  }
}
