import { TransactionsModel, Transactions } from '../../Backend/ship_Transactions/Model';
import { sequelize } from '../../Config/database';

export class ShipmentWeightController {
  async getShipmentWeightByAWB(AWB: string): Promise<TransactionsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = await Transactions.findOne({
          attributes: ['Weight'],
          where: {
            AWB: AWB,
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });
        return result ? result.toJSON() : 'Could not get Shipment Weight';
      });
    } catch (err) {
      throw new Error(`Could not get Shipment Weight. Error: ${err}`);
    }
  }
}
