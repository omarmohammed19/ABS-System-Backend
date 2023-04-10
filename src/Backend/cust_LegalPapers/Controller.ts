import { LegalPapersModel, LegalPapers } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cust_LegalPapers] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as LegalPapersModel;
};

export class LegalPapersController {
  async index(language: string, limit: number, isActive: number): Promise<LegalPapersModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_LegalPapers] @language = :language, @limit= :limit, @isActive = :isActive ,@Method = :Method';
      const replacements = { language: language, limit: limit, isActive: isActive, Method: 'GET' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as LegalPapersModel[];
    } catch (err) {
      throw new Error(`Could not get all legalPapers. Error: ${err}`);
    }
  }

  async create(LegalPaper: LegalPapersModel): Promise<LegalPapersModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await LegalPapers.create(
          {
            mainAccountID: LegalPaper.mainAccountID,
            legalPaperTypeID: LegalPaper.legalPaperTypeID,
            legalPaperImage: LegalPaper.legalPaperImage,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new LegalPaper';
      });
    } catch (err) {
      throw new Error(`Could not add new LegalPaper. Error: ${err}`);
    }
  }

  async getLegalPaperById(ID: number, language: string): Promise<LegalPapersModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(ID, t, language); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get legalPaper by ID. Error: ${err}`);
    }
  }

  async update(legalPaperImage: string, ID: number): Promise<LegalPapersModel[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_cust_LegalPapers] @ID = :ID , @legalPaperImage = :legalPaperImage , @Method = :Method';
      const replacements = { ID: ID, legalPaperImage: legalPaperImage, Method: 'UPDATE' };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.UPDATE };
      const result = await sequelize.query(query, options);
      return result as unknown as LegalPapersModel[];
    } catch (err) {
      throw new Error(`Could not update legalPaperImage. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<LegalPapersModel>(LegalPapers, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Addresses. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<LegalPapersModel>(LegalPapers, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Addresses. Error: ${err}`);
    }
  }
}
