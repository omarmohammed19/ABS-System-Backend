import { ShipmentTypesModel, ShipmentTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enShipmentType', 'Notes'] : ['ID', 'arShipmentType', 'Notes'];
  return ShipmentTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ShipmentTypesController {
  async index(language: string): Promise<ShipmentTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enShipmentType', 'Notes'] : ['ID', 'arShipmentType', 'Notes'];
        const result = await ShipmentTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ShipmentTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ShipmentTypes. Error: ${err}`);
    }
  }

  async create(shipmentTypes: ShipmentTypesModel): Promise<ShipmentTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ShipmentTypes.create(
          {
            enShipmentType: shipmentTypes.enShipmentType,
            arShipmentType: shipmentTypes.arShipmentType,
            Notes: shipmentTypes.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ShipmentTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new ShipmentType. Error: ${err}`);
    }
  }

  async getShipmentTypeById(language: string, ID: number): Promise<ShipmentTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ShipmentTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ShipmentType by ID. Error: ${err}`);
    }
  }

  async update(shipmentTypes: ShipmentTypesModel): Promise<ShipmentTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ShipmentTypes.update(
          {
            enShipmentType: shipmentTypes.enShipmentType,
            arShipmentType: shipmentTypes.arShipmentType,
            Notes: shipmentTypes.Notes,
          },
          {
            where: {
              ID: shipmentTypes.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(shipmentTypes.ID), t);
        return result ? result.toJSON() : 'Could not update ShipmentTypes';
      });
    } catch (err) {
      throw new Error(`Could not update ShipmentType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ShipmentTypesModel>(ShipmentTypes, 'ID''ID', ID, 'deactivate'');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ShipmentType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ShipmentTypesModel>(ShipmentTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ShipmentType. Error: ${err}`);
    }
  }
}
