import { Branch } from './../../../src2/Models2/BranchesModel';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import { TransactionHdrModel, TransactionHdr } from '../../Backend/ship_TransactionHdr/Model';
import { PickupsModel, Pickups } from '../../Backend/ship_Pickups/Model';
import { PickupHistoryModel, PickupHistory } from '../../Backend/ship_PickupHistory/Model';
import { SubAccountsVerification } from '../../Backend/cust_SubAccountsVerification/Model';

const verified = async (subAccountID: number) => {
  const result: any = await SubAccountsVerification.findAll({
    where: {
      subAccountID: subAccountID,
      isVerified: false,
    }
  });
  if (result.length === 0) {
    return true;
  }
  return false;
}

export class CreatePickupController {
  async getPickup_ReturnLocationsBySubAccountID(locationType: string, subAccountID: number, language: String): Promise<any> {
    try {
      const query = 'EXEC [dbo].[p_GET_Pickup_Return_Locations]@locationType = :locationType, @subAccountID= :subAccountID , @language=:language';
      const replacements = { locationType: locationType, subAccountID: subAccountID, language: language };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as any;
    } catch (err) {
      throw new Error(`Could not get Status Count. Error: ${err}`);
    }
  }

  async CreatePickup(transactionHdr: TransactionHdrModel, pickup: PickupsModel, pickupHistory: PickupHistoryModel): Promise<any> {
    try {

      const isVerified = await verified(transactionHdr.subAccountID);
      if (!isVerified) {
        return (`Account is not verified`);
      }

      let newPickup: any;
      await sequelize.transaction(async (t) => {
        const newTransactionHdr = await TransactionHdr.create(
          {
            mainAccountID: transactionHdr.mainAccountID,
            subAccountID: transactionHdr.subAccountID,
            userID: transactionHdr.userID,
            creationDate: transactionHdr.creationDate,
          },
          { transaction: t, returning: ['ID'] } // pass transaction object and specify returning column(s)
        );

        newPickup = await Pickups.create(
          {
            mainAccountID: pickup.mainAccountID,
            subAccountID: pickup.subAccountID,
            pickupLocationID: pickup.pickupLocationID,
            branchID: pickup.branchID,
            transHdrID: newTransactionHdr.ID,
            pickupTypeID: pickup.pickupTypeID,
            vehicleTypeID: pickup.vehicleTypeID,
            noOfAWBs: pickup.noOfAWBs,
            timeFrom: pickup.timeFrom,
            toTime: pickup.toTime,
            statusID: 1,
            userID: pickup.userID,
            creationDate: pickup.creationDate,
            createdAWBs: 0,
            Notes: pickup.Notes,
          },
          { transaction: t, returning: ['ID'] } // pass transaction object to query
        );

        await PickupHistory.create(
          {
            pickupID: newPickup.ID,
            statusID: 1,
            actionTime: pickupHistory.actionTime,
            userID: pickupHistory.userID,
          },
          { transaction: t }
        );
        return newPickup.ID; // return the PickupID
      });

      return newPickup.ID;
    } catch (err) {
      throw new Error(`Could not add new TransactionHdr. Error: ${err}`);
    }
  }
}
