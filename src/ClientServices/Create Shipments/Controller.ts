import { rgb } from 'pdf-lib';
import { sequelize } from '../../Config/database';
import { PackageTypes } from '../../Backend/ship_PackageTypes/Model';
import { Products } from '../../Backend/ship_Products/Model';
import { Cities, CitiesModel } from '../../Backend/cmp_Cities/Model';
import { Services } from '../../Backend/cmp_Services/Model';
import { TransactionHdrModel, TransactionHdr } from '../../Backend/ship_TransactionHdr/Model';
import { PickupsModel, Pickups } from '../../Backend/ship_Pickups/Model';
import { PickupHistoryModel, PickupHistory } from '../../Backend/ship_PickupHistory/Model';
import { TransactionsModel, Transactions } from '../../Backend/ship_Transactions/Model';
import { TransactionHistoryModel, TransactionHistory } from '../../Backend/ship_TransactionHistory/Model';
import { ContactPersonsModel, ContactPersons } from '../../Backend/cnee_ContactPersons/Model';
import { ContactNumbersModel, ContactNumbers } from '../../Backend/cnee_ContactNumbers/Model';
import { AddressesModel, Addresses } from '../../Backend/cnee_Addresses/Model';
import { SubAccounts } from '../../Backend/cust_SubAccounts/Model';
import { BranchesController } from '../../Backend/cmp_Branches/Controller';
import xlsx from 'xlsx';
import { TransactionsController } from '../../Backend/ship_Transactions/Controller';
import Sequelize from 'sequelize';

const branchesController = new BranchesController();

const transactionsController = new TransactionsController();

const getPrefix = async (subAccountID: number) => {
  const result: any = await SubAccounts.findOne({ where: { ID: subAccountID } });
  if (result.prefix === null) {
    return '';
  }
  return result.prefix;
};

const checkAWBDuplicate = async (AWB: string) => {
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

const getProductIDByName = async (name: string) => {
  const product = await Products.findOne({
    attributes: ['ID'],
    where: {
      enProduct: name,
      isActive: true,
    },
  });

  return product ? product.ID : null;
};

const getPackageTypeIDByName = async (name: string) => {
  const packageType = await PackageTypes.findOne({
    attributes: ['ID'],
    where: {
      enPackageType: name,
      isActive: true,
    },
  });

  return packageType ? packageType.ID : null;
};

const getBranchIDByCityName = async (name: string) => {
  const city = await Cities.findOne({
    attributes: ['branchID'],
    where: {
      enCityName: name,
      isActive: true,
    },
  });

  return city ? city.branchID : null;
};

const getCityIDByCityName = async (name: string) => {
  const city = await Cities.findOne({
    attributes: ['ID'],
    where: {
      enCityName: name,
      isActive: true,
    },
  });

  return city ? city.ID : null;
};

const getBranchIDByCityID = async (cityID: number) => {
  const city = await Cities.findOne({
    attributes: ['branchID'],
    where: {
      ID: cityID,
      isActive: true,
    },
  });

  return city ? city.branchID : null;
};

// get serviceID by name
const getServiceIDByName = async (name: string) => {
  const service = await Services.findOne({
    attributes: ['ID'],
    where: {
      enService: name,
      isActive: true,
    },
  });

  return service ? service.ID : null;
};

const checkRefExists = async (Ref: string) => {
  const result: any = await Transactions.findOne({ where: { Ref: Ref } });
  if (result) {
    return true;
  }
  return false;
}

const getBranchIDByPickupLocationID = async (PickupLocationID: number): Promise<any> => {
  const query = 'EXEC [dbo].[p_GET_BranchID_By_PickupLocationID] @PickupLocationID = :PickupLocationID';
  const replacements = { PickupLocationID: PickupLocationID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  const result = await sequelize.query(query, options);
  const branchID = result[0] as unknown as any;
  return branchID.branchID;
};

const getBranchIDByReturnLocationID = async (ReturnLocationID: number): Promise<any> => {
  const query = 'EXEC [dbo].[p_GET_BranchID_By_ReturnLocationID] @ReturnLocationID = :ReturnLocationID';
  const replacements = { ReturnLocationID: ReturnLocationID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
  const result = await sequelize.query(query, options);
  const branchID = result[0] as unknown as any;
  return branchID.branchID;
};

async function insertDataIntoDatabase(
  transactionHdr: TransactionHdrModel,
  pickup: PickupsModel,
  pickupHistory: PickupHistoryModel,
  transactions: TransactionsModel,
  transactionHistory: TransactionHistoryModel,
  data: any,
  service: string
) {
  // Use a Sequelize transaction to insert the data into the database
  let newPickup: any;
  let location: any;
  let ToBranchID: any;
  let DeliveryBranchID: any;

  if (data[0].Service !== 'Return') {
    location = pickup.pickupLocationID;
    ToBranchID = await getBranchIDByPickupLocationID(pickup.pickupLocationID);
  } else {
    location = pickup.returnLocationID;
    DeliveryBranchID = await getBranchIDByReturnLocationID(pickup.returnLocationID);
  }

  await sequelize.transaction(async (t) => {
    const newTransactionHdr = await TransactionHdr.create(
      {
        mainAccountID: transactionHdr.mainAccountID,
        subAccountID: transactionHdr.subAccountID,
        userID: transactionHdr.userID,
        serviceID: await getServiceIDByName(service),
        creationDate: transactionHdr.creationDate,
        noOfAWBs: data.length,
      },
      { transaction: t, returning: ['ID'] }
    );

    newPickup = await Pickups.create(
      {
        mainAccountID: pickup.mainAccountID,
        subAccountID: pickup.subAccountID,
        pickupLocationID: location,
        transHdrID: newTransactionHdr.ID,
        pickupTypeID: pickup.pickupTypeID,
        vehicleTypeID: pickup.vehicleTypeID,
        noOfAWBs: data.length,
        actualAWBs: data.length,
        timeFrom: pickup.timeFrom,
        toTime: pickup.toTime,
        statusID: 1,
        userID: pickup.userID,
        creationDate: pickup.creationDate,
        createdAWBs: 0,
        Notes: pickup.Notes,
      },
      { transaction: t, returning: ['ID', 'pickupLocationID'] }
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

    const transactionData = await Promise.all(
      data.map(async (row: any) => {
        if (data[0].Service !== 'Return') {
          DeliveryBranchID = await getBranchIDByCityName(row.City);
        } else {
          ToBranchID = await getBranchIDByCityName(row.City);
        }
        return {
          transHdrID: newTransactionHdr.ID,
          AWB: await generateAWB(transactions.subAccountID),
          mainAccountID: transactions.mainAccountID,
          subAccountID: transactions.subAccountID,
          serviceID: await getServiceIDByName(row.Service),
          statusID: 1,
          expectedDeliveryDate: transactions.expectedDeliveryDate,
          creationDate: transactions.creationDate,
          lastChangeDate: transactions.lastChangeDate,
          userID: transactions.userID,
          expiryDate: transactions.expiryDate,
          deliveryBranchID: DeliveryBranchID,
          toBranchID: ToBranchID,
          shipmentTypeID: 1,
          Ref: row.Ref,
          specialInstructions: row.specialInstructions,
          productID: await getProductIDByName(row.Product),
          packageTypeID: await getPackageTypeIDByName(row.PackageType),
          noOfPcs: row.noOfPcs,
          contents: row.contents,
          weight: row.weight,
          actualWeight: row.weight,
          Cash: row.Cash,
        };
      })
    );

    const createdTransactions = await Transactions.bulkCreate(transactionData, { transaction: t, returning: ['ID', 'AWB'] });
    const transIDs = createdTransactions.map((transaction) => transaction.ID);

    const transactionHistoryData = await Promise.all(
      transIDs.map(async (transID, index) => {
        return {
          transID: transID,
          shipmentTypeID: 1,
          statusID: 1,
          auditDate: transactionHistory.auditDate,
          userID: transactionHistory.userID,
          toBranchID: ToBranchID,
        };
      })
    );

    await TransactionHistory.bulkCreate(transactionHistoryData, { transaction: t });

    const contactPersonData = await Promise.all(
      data.map(async (row: any) => {
        return {
          firstName: row.firstName,
          lastName: row.lastName,
        };
      })
    );

    const createdContactPerson = await ContactPersons.bulkCreate(contactPersonData, { transaction: t, returning: ['ID'] });

    const AWBs = createdTransactions.map((transaction) => transaction.AWB);
    const ContactPersonIDs = createdContactPerson.map((contactPerson) => contactPerson.ID);

    const addressData = await Promise.all(
      AWBs.map(async (AWB, index) => {
        return {
          AWB: AWB,
          streetName: data[index].streetName,
          apartmentNumber: data[index].apartmentNumber,
          floorNumber: data[index].floorNumber,
          buildingNumber: data[index].buildingNumber,
          cityID: await getCityIDByCityName(data[index].City),
          postalCode: data[index].postalCode,
          cneeContactPersonID: ContactPersonIDs[index],
          longitude: data[index].longitude,
          latitude: data[index].latitude,
        };
      })
    );

    await Addresses.bulkCreate(addressData, { transaction: t });

    const contactNumberData = ContactPersonIDs.map((ContactPersonID, index) => {
      return {
        contactNumber: data[index].contactNumber,
        cneeContactPersonID: ContactPersonID,
        numberTypeID: 1,
      };
    });

    await ContactNumbers.bulkCreate(contactNumberData, { transaction: t });
  });
  return newPickup.ID;
}

export class CreateShipmentsController {
  async createSingleShipment(
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
        const RefExists = await checkRefExists(transactions.Ref);

        const productTypeID = await SubAccounts.findOne({
          attributes: ['productTypeID'],
          where: { ID: transactionHdr.subAccountID },
        });

        console.log(productTypeID?.productTypeID);


        if (RefExists) {
          return 'Ref already exists';
        }
        const newTransactionHdr = await TransactionHdr.create(
          {
            mainAccountID: transactionHdr.mainAccountID,
            subAccountID: transactionHdr.subAccountID,
            userID: transactionHdr.userID,
            serviceID: transactionHdr.serviceID,
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
            serviceID: transactions.serviceID,
            shipmentTypeID: 1,
            statusID: 1,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            productID: productTypeID?.productTypeID,
            creationDate: transactions.creationDate,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: await getBranchIDByCityID(addresses.cityID),
            toBranchID: await getBranchIDByPickupLocationID(pickup.pickupLocationID),
            specialInstructions: transactions.specialInstructions,
            packageTypeID: transactions.packageTypeID,
            noOfPcs: transactions.noOfPcs,
            contents: transactions.contents,
            weight: transactions.weight,
            actualWeight: transactions.actualWeight,
            Cash: transactions.Cash,
          },
          { transaction: t, returning: ['ID', 'AWB'] } // pass transaction object to query
        );

        await TransactionHistory.create(
          {
            transID: newTransaction.ID,
            shipmentTypeID: 1,
            statusID: 1,
            auditDate: transactionHistory.auditDate,
            userID: transactionHistory.userID,
            toBranchID: await getBranchIDByPickupLocationID(pickup.pickupLocationID),
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

  async CreateMultipleShipments(
    excelPath: string,
    transactionHdr: TransactionHdrModel,
    pickup: PickupsModel,
    pickupHistory: PickupHistoryModel,
    transactions: TransactionsModel,
    transactionHistory: TransactionHistoryModel
  ): Promise<any> {
    const workbook = xlsx.readFile(excelPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: any = xlsx.utils.sheet_to_json(sheet, {
      header: [
        'Ref',
        'Service',
        'Product',
        'specialInstructions',
        'PackageType',
        'noOfPcs',
        'contents',
        'weight',
        'Cash',
        'firstName',
        'lastName',
        'contactNumber',
        'streetName',
        'apartmentNumber',
        'floorNumber',
        'buildingNumber',
        'City',
        'postalCode',
        'longitude',
        'latitude',
      ],
    });

    const Delivery: any = [];
    const Return: any = [];
    const Exchange: any = [];
    const CashCollection: any = [];
    const servicesList: any = [];
    const pickupIDs: any = [];

    await Promise.all(
      data.slice(1).map(async (row: any) => {
        let serviceID = await getServiceIDByName(row.Service);
        if (serviceID === 1) {
          Delivery.push(row);
        } else if (serviceID === 2) {
          Return.push(row);
        } else if (serviceID === 3) {
          Exchange.push(row);
        }
        if (!servicesList.includes(row.Service)) {
          servicesList.push(row.Service);
        }
      })
    );

    for (const service of servicesList) {
      if (service === 'Delivery') {
        const pickupID = await insertDataIntoDatabase(transactionHdr, pickup, pickupHistory, transactions, transactionHistory, Delivery, 'Delivery');
        pickupIDs.push('Delivery PickupID: ' + pickupID);
      } else if (service === 'Return') {
        const pickupID = await insertDataIntoDatabase(transactionHdr, pickup, pickupHistory, transactions, transactionHistory, Return, 'Return');
        pickupIDs.push('Return PickupID: ' + pickupID);
      } else if (service === 'Exchange') {
        const pickupID = await insertDataIntoDatabase(transactionHdr, pickup, pickupHistory, transactions, transactionHistory, Exchange, 'Exchange');
        pickupIDs.push('Exchange PickupID: ' + pickupID);
      } else if (service === 'CashCollection') {
        const pickupID = await insertDataIntoDatabase(
          transactionHdr,
          pickup,
          pickupHistory,
          transactions,
          transactionHistory,
          CashCollection,
          'Cash Collection'
        );
        pickupIDs.push('Cash Collection PickupID: ' + pickupID);
      }
    }

    return pickupIDs;
  }
}
