import { ShipmentServicesModel, ShipmentServices } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, t: Transaction) => {
  const results = await ShipmentServices.findAll({
    attributes: ['serviceID'],
    where: {
      AWB: AWB,
      isActive: true,
    },
    transaction: t,
  });

  const serviceID = results.map((result) => result.serviceID);

  return {
    serviceID: serviceID,
  };
};

export class ShipmentServicesController {
  async getServicesByAWB(AWB: string): Promise<ShipmentServicesModel | number> {
    try {
      const result: any = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByAWB(AWB, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Services by AWB. Error: ${err}`);
    }
  }
}
