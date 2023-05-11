import { BankDetailsModel, BankDetails } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = async (ID: Number, t: Transaction, language: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_BankDetails] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options)
  return result as unknown as BankDetailsModel;
};

export class BankDetailsController {
  async index(language: string, isActive: number, limit: number): Promise<BankDetailsModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_BankDetails] @language = :language, @Method = :Method, @isActive = :isActive, @limit = :limit';
      const replacements = { language: language, Method: 'GET', isActive: isActive, limit: limit };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = sequelize.query(query, options)
      return result as unknown as BankDetailsModel[];
    } catch (err) {
      throw new Error(`Could not get all BankDetails. Error: ${err}`);
    }
  }
  async create(bankDetails: BankDetailsModel): Promise<BankDetailsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
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
    } catch (err) {
      throw new Error(`Could not add new BankDetails. Error: ${err}`);
    }
  }


  async getBankDetialsById(ID: number, language: string): Promise<BankDetailsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get BankDetails by ID. Error: ${err}`);
    }
  }

  async getBankDetailsBySubAccountID(subAccountID: number): Promise<BankDetailsModel | string> {
    try {
      const query = 'EXEC [dbo].[p_Get_cust_BankDetails] @Method = :Method, @subAccountID = :subAccountID';
      const replacements = { Method: 'GET_BySubAccountID', subAccountID: subAccountID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as BankDetailsModel;
    }
    catch (err) {
      throw new Error(`Could not get BankDetails by SubAccountID. Error: ${err}`);
    }
  };

  async update(bankDetails: BankDetailsModel, language: string): Promise<BankDetailsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
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
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(bankDetails.ID), t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not update BankDetails. Error: ${err}`);
    }
  }


  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<BankDetailsModel>(BankDetails, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate BankDetails. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<BankDetailsModel>(BankDetails, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate BankDetails. Error: ${err}`);
    }
  }
}
