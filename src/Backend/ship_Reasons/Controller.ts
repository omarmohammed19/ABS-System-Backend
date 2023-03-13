import { ReasonsModel, Reasons } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enReason', 'Notes'] : ['ID', 'arReason', 'Notes'];
  return Reasons.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ReasonsController {
  async index(language: string): Promise<ReasonsModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enReason', 'Notes'] : ['ID', 'arReason', 'Notes'];
        const result = await Reasons.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ReasonsModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all Reasons. Error: ${err}`);
    }
  }

  async create(reasons: ReasonsModel): Promise<ReasonsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Reasons.create(
          {
            enReason: reasons.enReason,
            arReason: reasons.arReason,
            Notes: reasons.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Reasons';
      });
    } catch (err) {
      throw new Error(`Could not add new Reason. Error: ${err}`);
    }
  }

  async getReasonById(language: string, ID: number): Promise<ReasonsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get Reasons by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Reason by ID. Error: ${err}`);
    }
  }

  async update(reasons: ReasonsModel): Promise<ReasonsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Reasons.update(
          {
            enReason: reasons.enReason,
            arReason: reasons.arReason,
            Notes: reasons.Notes,
          },
          {
            where: {
              ID: reasons.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(reasons.ID), t);
        return result ? result.toJSON() : 'Could not update Reasons';
      });
    } catch (err) {
      throw new Error(`Could not update Reason. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ReasonsModel>(Reasons, 'ID''ID', ID, 'deactivate'');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Reason. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ReasonsModel>(Reasons, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Reason. Error: ${err}`);
    }
  }
}
