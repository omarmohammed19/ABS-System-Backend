import { subAccount } from '../../../src2/Models2/subAccount';
import { sequelize } from '../../Config/database';
import Sequelize from 'sequelize';
import { TransactionHdrModel, TransactionHdr } from '../../Backend/ship_TransactionHdr/Model';
import { PickupsModel, Pickups } from '../../Backend/ship_Pickups/Model';
import { PickupHistoryModel, PickupHistory } from '../../Backend/ship_PickupHistory/Model';
import { TransactionsModel, Transactions } from '../../Backend/ship_Transactions/Model';
import { TransactionHistoryModel, TransactionHistory } from '../../Backend/ship_TransactionHistory/Model';
import { ContactPersonsModel, ContactPersons } from '../../Backend/cnee_ContactPersons/Model';
import { ContactNumbersModel, ContactNumbers } from '../../Backend/cnee_ContactNumbers/Model';
import { AddressesModel, Addresses } from '../../Backend/cnee_Addresses/Model';
import { SubAccounts } from '../../Backend/cust_SubAccounts/Model';

const getPrefix = async (subAccountID: number) => {
  const result: any = await SubAccounts.findOne({ where: { ID: subAccountID } });
  return result.prefix;
};

const checkAWBDuplicate = async (AWB: String) => {
  // if in table re-generate random number and check
  const result: any = await Transactions.findOne({ where: { AWB: AWB } });
  if (result) {
    return true;
  }
  return false;
};

const generateAWB = async (subAccountID: number) => {
  const prefix = await getPrefix(subAccountID);
  const min = 1000000; // minimum 7-digit number (inclusive)
  const max = 9999999; // maximum 7-digit number (inclusive)
  let AWB: any = '';
  let flag: any = true;
  while (flag) {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    AWB = prefix + String(rand);
    flag = await checkAWBDuplicate(AWB);
  }
  return AWB;
};

export class CreateSingleShipmentController {
  async createShipment(
    transactionHdr: TransactionHdrModel,
    pickup: PickupsModel,
    pickupHistory: PickupHistoryModel,
    transactions: TransactionsModel,
    transactionHistory: TransactionHistoryModel,
    contactPersons: ContactPersonsModel,
    contactNumbers: ContactNumbersModel,
    addresses: AddressesModel
  ): Promise<any> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const AWB = await generateAWB(transactionHdr.subAccountID);
        const newTransactionHdr = await TransactionHdr.create(
          {
            mainAccountID: transactionHdr.mainAccountID,
            subAccountID: transactionHdr.subAccountID,
            userID: transactionHdr.userID,
            creationDate: transactionHdr.creationDate,
            noOfAWBs: transactionHdr.noOfAWBs,
          },
          { transaction: t, returning: ['ID'] } // pass transaction object and specify returning column(s)
        );

        const newPickup = await Pickups.create(
          {
            mainAccountID: pickup.mainAccountID,
            subAccountID: pickup.subAccountID,
            pickupLocationID: pickup.pickupLocationID,
            transHdrID: newTransactionHdr.ID,
            pickupTypeID: pickup.pickupTypeID,
            vehicleTypeID: pickup.vehicleTypeID,
            noOfAWBs: pickup.noOfAWBs,
            actualAWBs: pickup.actualAWBs,
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

        const newTransaction = await Transactions.create(
          {
            transHdrID: newTransactionHdr.ID,
            AWB: AWB,
            Ref: transactions.Ref,
            mainAccountID: transactions.mainAccountID,
            subAccountID: transactions.subAccountID,
            shipmentTypeID: transactions.shipmentTypeID,
            statusID: 1,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            productID: transactions.productID,
            creationDate: transactions.creationDate,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: transactions.deliveryBranchID,
            toBranchID: transactions.toBranchID,
            specialInstructions: transactions.specialInstructions,
            packageTypeID: transactions.packageTypeID,
            noOfPcs: transactions.noOfPcs,
            contents: transactions.contents,
            weight: transactions.weight,
            Cash: transactions.Cash,
          },
          { transaction: t, returning: ['ID', 'AWB'] } // pass transaction object to query
        );

        await TransactionHistory.create(
          {
            transID: newTransaction.ID,
            shipmentTypeID: transactionHistory.shipmentTypeID,
            statusID: 1,
            auditDate: transactionHistory.auditDate,
            userID: transactionHistory.userID,
            toBranchID: transactionHistory.toBranchID,
          },
          { transaction: t } // pass transaction object to query
        );

        const newContactPerson = await ContactPersons.create(
          {
            firstName: contactPersons.firstName,
            lastName: contactPersons.lastName,
          },
          { transaction: t, returning: ['ID'] }
        );

        await ContactNumbers.create({
          contactNumber: contactNumbers.contactNumber,
          cneeContactPersonID: newContactPerson.ID,
          numberTypeID: contactNumbers.numberTypeID,
        });

        await Addresses.create(
          {
            AWB: newTransaction.AWB,
            streetName: addresses.streetName,
            apartmentNumber: addresses.apartmentNumber,
            floorNumber: addresses.floorNumber,
            buildingNumber: addresses.buildingNumber,
            cityID: addresses.cityID,
            postalCode: addresses.postalCode,
            cneeContactPersonID: newContactPerson.ID,
            longitude: addresses.longitude,
            latitude: addresses.latitude,
          },
          { transaction: t } // pass transaction object to query
        );

        return [newTransaction.AWB];
      });

      return result;
    } catch (err) {
      throw new Error(`Could not add new TransactionHdr. Error: ${err}`);
    }
  }
}
