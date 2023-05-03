import { PaymentInfoModel, PaymentInfo } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (subAccountID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_PaymentInfo] @language = :language, @Method = :Method, @subAccountID = :subAccountID';
  const replacements = { language: language, Method: 'GET_ByID', subAccountID: subAccountID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options)
  return result as unknown as PaymentInfoModel;
};

export class PaymentInfoController {
  async index(language: string, isActive: number, limit: number, paymentMethodID: number): Promise<PaymentInfoModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_PaymentInfo] @language = :language, @Method = :Method, @isActive = :isActive, @limit = :limit, @paymentMethodID = :paymentMethodID';
      const replacements = { language: language, Method: 'GET', isActive: isActive, limit: limit, paymentMethodID: paymentMethodID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as PaymentInfoModel[];
    } catch (err) {
      throw new Error(`Could not get all PaymentInfo. Error: ${err}`);
    }
  }

  async create(paymentInfo: PaymentInfoModel): Promise<PaymentInfoModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PaymentInfo.create(
          {
            subAccountID: paymentInfo.subAccountID,
            mobileCashID: paymentInfo.mobileCashID,
            walletDetailsID: paymentInfo.walletDetailsID,
            nearestBranchID: paymentInfo.nearestBranchID,
            bankDetailsID: paymentInfo.bankDetailsID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new PaymentInfo';
      });
    } catch (err) {
      throw new Error(`Could not add new PaymentInfo. Error: ${err}`);
    }
  }

  async getPaymentInfoBySubAccountID(subAccountID: number, language: string): Promise<PaymentInfoModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
        const item = await getById(subAccountID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get PaymentInfo by ID. Error: ${err}`);
    }
  }

  async update(paymentInfo: PaymentInfoModel, language: string): Promise<PaymentInfoModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await PaymentInfo.update(
          {
            subAccountID: paymentInfo.subAccountID,
            mobileCashID: paymentInfo.mobileCashID,
            walletDetailsID: paymentInfo.walletDetailsID,
            nearestBranchID: paymentInfo.nearestBranchID,
            bankDetailsID: paymentInfo.bankDetailsID,
          },
          {
            where: {
              ID: paymentInfo.ID,
            },
            transaction: t // pass transaction object to query
          });

        const item = await getById(paymentInfo.ID, t, language); // pass transaction object to getById function
        return item;
      });
    } catch (err) {
      throw new Error(`Could not update PaymentInfo. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PaymentInfoModel>(PaymentInfo, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PaymentInfo. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PaymentInfoModel>(PaymentInfo, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PaymentInfo. Error: ${err}`);
    }
  }
}
