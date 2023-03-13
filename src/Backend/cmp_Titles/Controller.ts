import { Titles, TitlesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enTitleName'] : ['ID', 'arTitleName'];
  return Titles.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class TitlesController {
  async index(language: string): Promise<TitlesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enTitleName'] : ['ID', 'arTitleName'];
        const result = await Titles.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as TitlesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all Titles. Error: ${err}`);
    }
  }

  async create(titles: TitlesModel): Promise<TitlesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Titles.create(
          {
            enTitleName: titles.enTitleName,
            arTitleName: titles.arTitleName,
            isActive: true,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not create new Title'; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not add new Title. Error: ${err}`);
    }
  }

  async getTitleById(language: string, ID: number): Promise<TitlesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get Title by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Title by ID. Error: ${err}`);
    }
  }

  async update(titles: TitlesModel): Promise<TitlesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Titles.update(
          {
            enTitleName: titles.enTitleName,
            arTitleName: titles.arTitleName,
          },
          {
            where: {
              ID: titles.ID,
            },
            // fields: ['enContactLogType', 'arContactLogType', 'Notes'],
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(titles.ID), t);
        return result ? result.toJSON() : 'Could not update Title'; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not update Title. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<TitlesModel | string> {
    try {
      const result = await De_Activate<TitlesModel>(Titles, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Title. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<TitlesModel | string> {
    try {
      const result = await De_Activate<TitlesModel>(Titles, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Title. Error: ${err}`);
    }
  }
}
