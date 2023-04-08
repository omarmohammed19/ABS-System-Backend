import { PickupHistoryModel, PickupHistory } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

// const getByID = async (pickupID: number, language: string, t: Transaction) => {
//   const query = 'EXEC [dbo].[p_GET_ship_Pickups] @language = :language , @Method = :Method, @pickupID = :pickupID';
//   const replacements = { language: language, Method: 'GET_ByID', pickupID: pickupID };
//   const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
//   const result = await sequelize.query(query, options);
//   return result as unknown as PickupHistoryModel;
// };

export class PickupHistoryController {
  // async index(language: string, isActive: number, limits?: number): Promise<PickupHistoryModel[]> {
  //   const limit = limits || 10;
  //   try {
  //     const query = 'EXEC [dbo].[p_GET_ship_Pickups] @limit = :limit ,@language = :language , @Method = :Method , @isActive = :isActive';
  //     const replacements = { limit: limit, language: language, Method: 'GET', isActive: isActive };
  //     const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  //     const result = await sequelize.query(query, options);
  //     return result as unknown as PickupHistoryModel[];
  //   } catch (err) {
  //     throw new Error(`Could not get all PickupHistory. Error: ${err}`);
  //   }
  // }

  async create(pickupHistory: PickupHistoryModel): Promise<PickupHistoryModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PickupHistory.create(
          {
            pickupID: pickupHistory.pickupID,
            statusID: pickupHistory.statusID,
            actionTime: pickupHistory.actionTime,
            userID: pickupHistory.userID,
            runnerID: pickupHistory.runnerID,
            reasonID: pickupHistory.reasonID,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new PickupHistory';
      });
    } catch (err) {
      throw new Error(`Could not add new PickupHistory. Error: ${err}`);
    }
  }

  // async getPickupsByID(PickupID: number, language: string): Promise<PickupHistoryModel | string> {
  //   try {
  //     const result = await sequelize.transaction(async (t) => {
  //       // start managed transaction and pass transaction object to the callback function
  //       const item = await getByID(PickupID, language, t); // pass transaction object to getById function
  //       return item;
  //     });
  //     return result;
  //   } catch (err) {
  //     throw new Error(`Could not get PickupHistory by ID. Error: ${err}`);
  //   }
  // }

  // async update(language: string, pickupHistory: PickupHistoryModel): Promise<PickupHistoryModel | string> {
  //   try {
  //     return await sequelize.transaction(async (t) => {
  //       // start managed transaction and pass transaction object to the callback function
  //       await PickupHistory.update(
  //         {
  //           mainAccountID: pickupHistory.mainAccountID,
  //           subAccountID: pickupHistory.subAccountID,
  //           pickupLocationID: pickupHistory.pickupLocationID,
  //           transHdrID: pickupHistory.transHdrID,
  //           pickupTypeID: pickupHistory.pickupTypeID,
  //           vehicleTypeID: pickupHistory.vehicleTypeID,
  //           noOfAWBs: pickupHistory.noOfAWBs,
  //           actualAWBs: pickupHistory.actualAWBs,
  //           pickedUpDate: pickupHistory.pickedUpDate,
  //           timeFrom: pickupHistory.timeFrom,
  //           toTime: pickupHistory.toTime,
  //           statusID: pickupHistory.statusID,
  //           userID: pickupHistory.userID,
  //           creationDate: pickupHistory.creationDate,
  //           assignedBy: pickupHistory.assignedBy,
  //           assignedTo: pickupHistory.assignedTo,
  //           createdAWBs: pickupHistory.createdAWBs,
  //           Notes: pickupHistory.Notes,
  //         },
  //         {
  //           where: {
  //             ID: pickupHistory.ID,
  //           },
  //           transaction: t, // pass transaction object to query
  //         }
  //       );
  //       const result = await getByID(pickupHistory.ID, language, t);
  //       return result;
  //     });
  //   } catch (err) {
  //     throw new Error(`Could not update PickupHistory. Error: ${err}`);
  //   }
  // }

  async deactivate(PickupID: number): Promise<string> {
    try {
      const result = await De_Activate<PickupHistoryModel>(PickupHistory, 'ID', PickupID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PickupHistory. Error: ${err}`);
    }
  }

  async activate(PickupID: number): Promise<string> {
    try {
      const result = await De_Activate<PickupHistoryModel>(PickupHistory, 'ID', PickupID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PickupHistory. Error: ${err}`);
    }
  }
}
