import { VerificationTypesModel, VerificationTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enVerificationType', 'Notes'] : ['ID', 'arVerificationType', 'Notes'];

  return VerificationTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class VerificationTypesController {
  async index(language: string): Promise<VerificationTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enVerificationType', 'Notes'] : ['ID', 'arVerificationType', 'Notes'];
        const result = await VerificationTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as VerificationTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all Verification Types. Error: ${err}`);
    }
  }

  async create(verificationType: VerificationTypesModel): Promise<VerificationTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await VerificationTypes.create(
          {
            enVerificationType: verificationType.enVerificationType,
            arVerificationType: verificationType.arVerificationType,
            Notes: verificationType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Verification Types';
      });
    } catch (err) {
      throw new Error(`Could not add new Verification Types. Error: ${err}`);
    }
  }

  async getVerificationTypeById(language: string, ID: number): Promise<VerificationTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get Verification Types by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Verification Types by ID. Error: ${err}`);
    }
  }

  async update(verificationType: VerificationTypesModel): Promise<VerificationTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await VerificationTypes.update(
          {
            enVerificationType: verificationType.enVerificationType,
            arVerificationType: verificationType.arVerificationType,
            Notes: verificationType.Notes,
          },
          {
            where: {
              ID: verificationType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(verificationType.ID), t);
        return result ? result.toJSON() : 'Could not update Verification Type';
      });
    } catch (err) {
      throw new Error(`Could not update verification Type. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<VerificationTypesModel>(VerificationTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Verification Type. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<VerificationTypesModel>(VerificationTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Verification Type. Error: ${err}`);
    }
  }
}
