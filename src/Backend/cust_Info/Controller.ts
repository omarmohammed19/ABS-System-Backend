import { InfoModel, Info } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction) => {
  return Info.findOne({
    attributes: ['ID', 'firstName', 'lastName'],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class InfoController {
  async index(): Promise<InfoModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Info.findAll({
          attributes: ['ID', 'firstName', 'lastName'],
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as InfoModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all Info. Error: ${err}`);
    }
  }

  async create(info: InfoModel): Promise<InfoModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Info.create(
          {
            firstName: info.firstName,
            lastName: info.lastName,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new info';
      });
    } catch (err) {
      throw new Error(`Could not add new info. Error: ${err}`);
    }
  }

  async getInfoByID(ID: number): Promise<InfoModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get info by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get info by ID. Error: ${err}`);
    }
  }

  async update(info: InfoModel): Promise<InfoModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Info.update(
          {
            firstName: info.firstName,
            lastName: info.lastName,
          },
          {
            where: {
              ID: info.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(info.ID), t);
        return result ? result.toJSON() : 'Could not update info';
      });
    } catch (err) {
      throw new Error(`Could not update info. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<InfoModel>(Info, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate info. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<InfoModel>(Info, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate info. Error: ${err}`);
    }
  }
}
