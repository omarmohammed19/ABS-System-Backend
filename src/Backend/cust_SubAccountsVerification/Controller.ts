import { SubAccountsVerification, SubAccountsVerificationModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_SubAccountsVerification]  @Method = :Method, @ID = :ID, @language = :language';
  const replacements = { Method: 'GET_By_ID', ID: ID, language: language };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  const result = sequelize.query(query, options);
  return result as unknown as SubAccountsVerificationModel;
};

const getBySubAccountId = (subAccountID: number, t: Transaction, language: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_SubAccountsVerification]  @Method = :Method, @subAccountID = :subAccountID';
  const replacements = { Method: 'GET_By_SubAccountID', subAccountID: subAccountID, language: language };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  const result = sequelize.query(query, options);
  return result as unknown as SubAccountsVerificationModel;
};

export class SubAccountsVerificationController {
  async index(): Promise<SubAccountsVerificationModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = ['ID', 'subAccountID', 'verificationTypeID', 'isVerified'];
        const result = await SubAccountsVerification.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as SubAccountsVerificationModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all SubAccounts Verification. Error: ${err}`);
    }
  }

  async create(subAccountsVerification: SubAccountsVerificationModel): Promise<SubAccountsVerificationModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await SubAccountsVerification.create(
          {
            subAccountID: subAccountsVerification.subAccountID,
            verificationTypeID: subAccountsVerification.verificationTypeID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new SubAccount Verification';
      });
    } catch (err) {
      throw new Error(`Could not add new Verification Types. Error: ${err}`);
    }
  }

  async getSubAccountsVerificationById(ID: number, language: string): Promise<SubAccountsVerificationModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get SubAccount Verification by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get SubAccount Verification by ID. Error: ${err}`);
    }
  }

  async getSubAccountsVerificationBySubAccountId(subAccountID: number, language: string): Promise<any> {
    try {
      const result: any = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getBySubAccountId(subAccountID, t, language); // pass transaction object to getById function
        return item as unknown as SubAccountsVerificationModel[];
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get SubAccount Verification by SubAccount ID. Error: ${err}`);
    }
  }

  async update(subAccountsVerification: SubAccountsVerificationModel, language: string): Promise<SubAccountsVerificationModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await SubAccountsVerification.update(
          {
            subAccountID: subAccountsVerification.subAccountID,
            verificationTypeID: subAccountsVerification.verificationTypeID,
            isVerified: subAccountsVerification.isVerified,
          },
          {
            where: {
              ID: subAccountsVerification.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(subAccountsVerification.ID), t, language);
        return result ? result.toJSON() : 'Could not update SubAccount Verification';
      });
    } catch (err) {
      throw new Error(`Could not update verification Type. Error: ${err}`);
    }
  }

  async verifyVerificationTypeID(subAccountID: number, verificationTypeID: number): Promise<string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await SubAccountsVerification.update(
          {
            isVerified: true,
          },
          {
            where: {
              subAccountID: subAccountID,
              verificationTypeID: verificationTypeID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        return 'Verification Type is verified';
      });
    } catch (err) {
      throw new Error(`Could not update verification Type. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SubAccountsVerificationModel>(SubAccountsVerification, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate SubAccount Verification. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<SubAccountsVerificationModel>(SubAccountsVerification, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate SubAccount Verification. Error: ${err}`);
    }
  }
}
