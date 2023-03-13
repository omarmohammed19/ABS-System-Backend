import { NumberTypesModel, NumberTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enNumberType', 'Notes'] : ['ID', 'arNumberType', 'Notes'];
  return NumberTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class NumberTypesController {
  async index(language: string): Promise<NumberTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enNumberType', 'Notes'] : ['ID', 'arNumberType', 'Notes'];
        const result = await NumberTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as NumberTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all NumberTypes. Error: ${err}`);
    }
  }

  async create(NumberType: NumberTypesModel): Promise<NumberTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await NumberTypes.create(
          {
            enNumberType: NumberType.enNumberType,
            arNumberType: NumberType.arNumberType,
            Notes: NumberType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new NumberType';
      });
    } catch (err) {
      throw new Error(`Could not add new NumberType. Error: ${err}`);
    }
  }

  async getNumberTypesByID(language: string, ID: number): Promise<NumberTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get NumberTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get NumberType by ID. Error: ${err}`);
    }
  }

  async update(NumberType: NumberTypesModel): Promise<NumberTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await NumberTypes.update(
          {
            enNumberType: NumberType.enNumberType,
            arNumberType: NumberType.arNumberType,
            Notes: NumberType.Notes,
          },
          {
            where: {
              ID: NumberType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(NumberType.ID), t);
        return result ? result.toJSON() : 'Could not update NumberTypes';
      });
    } catch (err) {
      throw new Error(`Could not update NumberType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<NumberTypesModel>(NumberTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate NumberType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<NumberTypesModel>(NumberTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate NumberType. Error: ${err}`);
    }
  }
}
