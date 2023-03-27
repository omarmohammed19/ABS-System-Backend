import { PickupsModel, Pickups } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (pickupID: number, language: string, t: Transaction) => {
  const query = 'EXEC [dbo].[p_GET_ship_Pickups] @language = :language , @Method = :Method, @pickupID = :pickupID';
  const replacements = { language: language, Method: 'GET_ByID', pickupID: pickupID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as PickupsModel;
};

export class PickupsController {
  async index(language: string, isActive: number, limits?: number): Promise<PickupsModel[]> {
    const limit = limits || 10;
    try {
      const query = 'EXEC [dbo].[p_GET_ship_Pickups] @limit = :limit ,@language = :language , @Method = :Method , @isActive = :isActive';
      const replacements = { limit: limit, language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as PickupsModel[];
    } catch (err) {
      throw new Error(`Could not get all Pickups. Error: ${err}`);
    }
  }

  async create(pickups: PickupsModel): Promise<PickupsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Pickups.create(
          {
            mainAccountID: pickups.mainAccountID,
            subAccountID: pickups.subAccountID,
            pickupLocationID: pickups.pickupLocationID,
            transHdrID: pickups.transHdrID,
            pickupTypeID: pickups.pickupTypeID,
            vehicleTypeID: pickups.vehicleTypeID,
            noOfAWBs: pickups.noOfAWBs,
            actualAWBs: pickups.actualAWBs,
            pickedUpDate: pickups.pickedUpDate,
            timeFrom: pickups.timeFrom,
            toTime: pickups.toTime,
            statusID: pickups.statusID,
            userID: pickups.userID,
            creationDate: pickups.creationDate,
            assignedBy: pickups.assignedBy,
            assignedTo: pickups.assignedTo,
            createdAWBs: pickups.createdAWBs,
            Notes: pickups.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Pickups';
      });
    } catch (err) {
      throw new Error(`Could not add new Pickups. Error: ${err}`);
    }
  }

  async getPickupsByID(PickupID: number, language: string): Promise<PickupsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getByID(PickupID, language, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Pickups by ID. Error: ${err}`);
    }
  }

  // async update(language: string, pickups: PickupsModel): Promise<PickupsModel | string> {
  //   try {
  //     return await sequelize.transaction(async (t) => {
  //       // start managed transaction and pass transaction object to the callback function
  //       await Pickups.update(
  //         {
  //           enStatus: pickups.enStatus,
  //           arStatus: pickups.arStatus,
  //           custDisplayedStatusID: pickups.custDisplayedStatusID,
  //           requireReason: pickups.requireReason,
  //           Notes: pickups.Notes,
  //         },
  //         {
  //           where: {
  //             ID: pickups.ID,
  //           },
  //           transaction: t, // pass transaction object to query
  //         }
  //       );
  //       const result = await getByID(pickups.ID, language, t);
  //       return result;
  //     });
  //   } catch (err) {
  //     throw new Error(`Could not update Pickups. Error: ${err}`);
  //   }
  // }

  async deactivate(PickupID: number): Promise<string> {
    try {
      const result = await De_Activate<PickupsModel>(Pickups, 'ID', PickupID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Pickups. Error: ${err}`);
    }
  }

  async activate(PickupID: number): Promise<string> {
    try {
      const result = await De_Activate<PickupsModel>(Pickups, 'ID', PickupID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Pickups. Error: ${err}`);
    }
  }
}
