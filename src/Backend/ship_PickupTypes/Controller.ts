import { PickupTypesModel, PickupTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enPickupType', 'Notes'] : ['ID', 'arPickupType', 'Notes'];
  return PickupTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class PickupTypesController {
  async index(language: string): Promise<PickupTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enPickupType', 'Notes'] : ['ID', 'arPickupType', 'Notes'];
        const result = await PickupTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as PickupTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all PickupTypes. Error: ${err}`);
    }
  }

  async create(pickupTypes: PickupTypesModel): Promise<PickupTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PickupTypes.create(
          {
            enPickupType: pickupTypes.enPickupType,
            arPickupType: pickupTypes.arPickupType,
            Notes: pickupTypes.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new PickupTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new PickupType. Error: ${err}`);
    }
  }

  async getPickupTypeById(language: string, ID: number): Promise<PickupTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get PickupTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get PickupType by ID. Error: ${err}`);
    }
  }

  async update(pickupTypes: PickupTypesModel): Promise<PickupTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await PickupTypes.update(
          {
            enPickupType: pickupTypes.enPickupType,
            arPickupType: pickupTypes.arPickupType,
            Notes: pickupTypes.Notes,
          },
          {
            where: {
              ID: pickupTypes.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(pickupTypes.ID), t);
        return result ? result.toJSON() : 'Could not update PickupTypes';
      });
    } catch (err) {
      throw new Error(`Could not update PickupType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PickupTypesModel>(PickupTypes, 'ID''ID', ID, 'deactivate'');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PickupType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PickupTypesModel>(PickupTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PickupType. Error: ${err}`);
    }
  }
}
