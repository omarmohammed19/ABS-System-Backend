import { LegalPaperTypesModel, LegalPaperTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enLegalPaperType', 'Notes'] : ['ID', 'arLegalPaperType', 'Notes'];
  return LegalPaperTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class LegalPaperTypesController {
  async index(language: string): Promise<LegalPaperTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enLegalPaperType', 'Notes'] : ['ID', 'arLegalPaperType', 'Notes'];
        const result = await LegalPaperTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as LegalPaperTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all LegalPaperTypes. Error: ${err}`);
    }
  }

  async indexDeActivated(language: string): Promise<LegalPaperTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enLegalPaperType', 'Notes'] : ['ID', 'arLegalPaperType', 'Notes'];
        const result = await LegalPaperTypes.findAll({
          attributes: attributes,
          where: {
            isActive: false,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as LegalPaperTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all LegalPaperTypes. Error: ${err}`);
    }
  }

  async create(LegalPaperType: LegalPaperTypesModel): Promise<LegalPaperTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await LegalPaperTypes.create(
          {
            enLegalPaperType: LegalPaperType.enLegalPaperType,
            arLegalPaperType: LegalPaperType.arLegalPaperType,
            Notes: LegalPaperType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new LegalPaperType';
      });
    } catch (err) {
      throw new Error(`Could not add new LegalPaperType. Error: ${err}`);
    }
  }

  async getLegalPaperTypesByID(language: string, ID: number): Promise<LegalPaperTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get LegalPaperTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get LegalPaperType by ID. Error: ${err}`);
    }
  }

  async update(LegalPaperType: LegalPaperTypesModel): Promise<LegalPaperTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await LegalPaperTypes.update(
          {
            enLegalPaperType: LegalPaperType.enLegalPaperType,
            arLegalPaperType: LegalPaperType.arLegalPaperType,
            Notes: LegalPaperType.Notes,
          },
          {
            where: {
              ID: LegalPaperType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(LegalPaperType.ID), t);
        return result ? result.toJSON() : 'Could not update LegalPaperTypes';
      });
    } catch (err) {
      throw new Error(`Could not update LegalPaperType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<LegalPaperTypesModel>(LegalPaperTypes, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate LegalPaperType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<LegalPaperTypesModel>(LegalPaperTypes, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate LegalPaperTypes. Error: ${err}`);
    }
  }
}
