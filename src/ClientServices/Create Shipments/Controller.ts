import { sequelize } from '../../Config/database';
import { PackageTypes } from '../../Backend/ship_PackageTypes/Model';
import { Cities } from '../../Backend/cmp_Cities/Model';
import { CompanyServices } from '../../Backend/cmp_Services/Model';
import { TransactionHdrModel, TransactionHdr } from '../../Backend/ship_TransactionHdr/Model';
import { PickupsModel, Pickups } from '../../Backend/ship_Pickups/Model';
import { PickupHistoryModel, PickupHistory } from '../../Backend/ship_PickupHistory/Model';
import { TransactionsModel, Transactions } from '../../Backend/ship_Transactions/Model';
import { TransactionHistoryModel, TransactionHistory } from '../../Backend/ship_TransactionHistory/Model';
import { ContactPersonsModel, ContactPersons } from '../../Backend/cnee_ContactPersons/Model';
import { ContactNumbersModel, ContactNumbers } from '../../Backend/cnee_ContactNumbers/Model';
import { AddressesModel, Addresses } from '../../Backend/cnee_Addresses/Model';
import { SubAccounts } from '../../Backend/cust_SubAccounts/Model';
import xlsx from 'xlsx';
import Sequelize from 'sequelize';
import { ShipmentServices } from '../../Backend/ship_Services/Model';
import { Services } from '../../Backend/cust_Services/Model';
import { SubAccountsVerification } from '../../Backend/cust_SubAccountsVerification/Model';

let createdAWBs: any = [];
let deliveryCreatedAWBs: any;
let returnCreatedAWBs: any;

let RefExists: any;

let isVerified: any;

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

// const getProductIDByName = async (name: string) => {
//   const product = await Products.findOne({
//     attributes: ['ID'],
//     where: {
//       enProduct: name,
//       isActive: true,
//     },
//   });

//   return product ? product.ID : null;
// };

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
  const service = await CompanyServices.findOne({
    attributes: ['ID'],
    where: {
      enService: name,
      isActive: true,
    },
  });

  return service ? service.ID : null;
};

const checkRefExists = async (Ref: string, subAccountID: number) => {
  const result: any = await Transactions.findOne({ where: { Ref: Ref, subAccountID: subAccountID } });
  if (result) {
    return Ref;
  }
  return null;
}

const getServicesBySubAccountId = async (subAccountID: number) => {
  const results = await Services.findAll({
    attributes: ['serviceTypeID'],
    where: {
      subAccountID: subAccountID,
      isActive: true,
    }
  });

  const serviceTypeIDs = results.map(result => result.serviceTypeID);

  return {
    serviceTypeIDs: serviceTypeIDs
  };
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

  isVerified = await verified(transactionHdr.subAccountID);

  if (!isVerified) {
    return 'Account is not verified';
  }

  RefExists = await checkRefExists(data[0]["Order Reference"], transactionHdr.subAccountID);
  if (RefExists !== null) {
    return `Ref ${data[0]["Order Reference"]} already exists`;
  }

  if (data[0].Service !== 'Exchange') {
    // Use a Sequelize transaction to insert the data into the database
    let newPickup: any;
    let ToBranchID: any;
    let DeliveryBranchID: any;
    let subAccountServicesIDs: any;

    subAccountServicesIDs = await getServicesBySubAccountId(transactionHdr.subAccountID);

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
          pickupLocationID: data[0].Service !== 'Return' ? pickup.pickupLocationID : null,
          returnLocationID: data[0].Service !== 'Return' ? null : pickup.returnLocationID,
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
        { transaction: t, returning: data[0].Service !== 'Return' ? ['ID', 'pickupLocationID'] : ['ID', 'returnLocationID'] }
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

      const productTypeID = await SubAccounts.findOne({
        attributes: ['productTypeID'],
        where: { ID: transactionHdr.subAccountID }, transaction: t
      });

      const transactionData = await Promise.all(
        data.map(async (row: any) => {
          if (row.Service !== 'Return') {
            ToBranchID = await getBranchIDByPickupLocationID(pickup.pickupLocationID);
            DeliveryBranchID = await getBranchIDByCityName(row.City);
          } else {
            ToBranchID = await getBranchIDByCityName(row.City);
            DeliveryBranchID = await getBranchIDByReturnLocationID(pickup.returnLocationID);
          }

          let AWB: any = await generateAWB(transactionHdr.subAccountID);

          if (row.Service !== 'Return') {
            if (row["Allow Opening Packages?"] === 'Yes') {
              await ShipmentServices.create(
                {
                  AWB: AWB,
                  serviceID: 1,
                },
                { transaction: t }
              );
            }
            else if (row["Allow Opening Packages?"] !== 'No') {
              if (subAccountServicesIDs.serviceTypeIDs.includes(1)) {
                await ShipmentServices.create(
                  {
                    AWB: AWB,
                    serviceID: 1,
                  },
                  { transaction: t }
                );
              }
            }

            if (row["Fees On Consignee?"] === 'Yes') {
              await ShipmentServices.create(
                {
                  AWB: AWB,
                  serviceID: 2,
                },
                { transaction: t }
              );
            }
            else if (row["Fees On Consignee?"] !== 'No') {
              if (subAccountServicesIDs.serviceTypeIDs.includes(2)) {
                await ShipmentServices.create(
                  {
                    AWB: AWB,
                    serviceID: 2,
                  },
                  { transaction: t }
                );
              }
            }

            if (row["Same Day Delivery?"] === 'Yes') {
              await ShipmentServices.create(
                {
                  AWB: AWB,
                  serviceID: 3,
                },
                { transaction: t }
              );
            }
            else if (row["Same Day Delivery?"] !== 'No') {
              if (subAccountServicesIDs.serviceTypeIDs.includes(3)) {
                await ShipmentServices.create(
                  {
                    AWB: AWB,
                    serviceID: 3,
                  },
                  { transaction: t }
                );
              }
            }
          }



          return {
            transHdrID: newTransactionHdr.ID,
            AWB: AWB,
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
            Ref: row["Order Reference"],
            specialInstructions: row["Special Instructions"],
            productID: productTypeID?.productTypeID,
            packageTypeID: await getPackageTypeIDByName(row["Package Type"]),
            noOfPcs: row["#Pieces"],
            contents: row.Contents,
            weight: row.Weight,
            actualWeight: row.Weight,
            Cash: row.Service !== 'Return' ? row.Cash : -row.Cash,
          };
        })
      );

      const createdTransactions = await Transactions.bulkCreate(transactionData, { transaction: t, returning: ['ID', 'AWB'] });

      createdAWBs.push(createdTransactions.map((transaction) => transaction.AWB));

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
            firstName: row["First Name"],
            lastName: row["Last Name"],
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
            streetName: data[index]["Street Name"],
            apartmentNumber: data[index]["Apartment#"],
            floorNumber: data[index]["Floor#"],
            buildingNumber: data[index]["Building#"],
            cityID: await getCityIDByCityName(data[index].City),
            postalCode: data[index]["Postal Code"],
            cneeContactPersonID: ContactPersonIDs[index],
          };
        })
      );

      await Addresses.bulkCreate(addressData, { transaction: t });

      const contactNumberData = ContactPersonIDs.map((ContactPersonID, index) => {
        return {
          contactNumber: data[index]["Mobile Number"],
          cneeContactPersonID: ContactPersonID,
          numberTypeID: 1,
        };
      });

      await ContactNumbers.bulkCreate(contactNumberData, { transaction: t });
    });
    return newPickup.ID;
  }
  else {

    let ToBranchIDDelivery: any;
    let DeliveryBranchIDDelivery: any;

    let ToBranchIDReturn: any;
    let DeliveryBranchIDReturn: any;

    let DeliveryPickup: any;
    let ReturnPickup: any;

    let subAccountServicesIDs: any;

    subAccountServicesIDs = await getServicesBySubAccountId(transactionHdr.subAccountID);

    await sequelize.transaction(async (t) => {
      const newTransactionHdr = await TransactionHdr.create(
        {
          mainAccountID: transactionHdr.mainAccountID,
          subAccountID: transactionHdr.subAccountID,
          userID: transactionHdr.userID,
          serviceID: await getServiceIDByName(service),
          creationDate: transactionHdr.creationDate,
          noOfAWBs: data.length * 2,
        },
        { transaction: t, returning: ['ID'] }
      );


      const pickupData = [
        {
          mainAccountID: pickup.mainAccountID,
          subAccountID: pickup.subAccountID,
          pickupLocationID: pickup.pickupLocationID,
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
          createdAWBs: 1,
          Notes: pickup.Notes,
        },
        {
          mainAccountID: pickup.mainAccountID,
          subAccountID: pickup.subAccountID,
          returnLocationID: pickup.returnLocationID,
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
        }
      ];
      const newPickups = await Pickups.bulkCreate(pickupData, { transaction: t, returning: ['ID'] });

      DeliveryPickup = newPickups[0];
      ReturnPickup = newPickups[1];

      const pickupHistoryData = [
        {
          pickupID: DeliveryPickup.ID,
          statusID: 1,
          actionTime: pickupHistory.actionTime,
          userID: pickupHistory.userID,
        },
        {
          pickupID: ReturnPickup.ID,
          statusID: 1,
          actionTime: pickupHistory.actionTime,
          userID: pickupHistory.userID,
        }
      ];

      await PickupHistory.bulkCreate(pickupHistoryData, { transaction: t });

      const productTypeID = await SubAccounts.findOne({
        attributes: ['productTypeID'],
        where: { ID: transactionHdr.subAccountID }, transaction: t
      });



      const DeliveryTransactionData = await Promise.all(
        data.map(async (row: any) => {
          ToBranchIDDelivery = await getBranchIDByPickupLocationID(pickup.pickupLocationID);
          DeliveryBranchIDDelivery = await getBranchIDByCityName(row.City);

          let AWB: any = await generateAWB(transactionHdr.subAccountID);
          if (row["Allow Opening Packages?"] === 'Yes') {
            await ShipmentServices.create(
              {
                AWB: AWB,
                serviceID: 1,
              },
              { transaction: t }
            );
          }
          else if (row["Allow Opening Packages?"] !== 'No') {
            if (subAccountServicesIDs.serviceTypeIDs.includes(1)) {
              await ShipmentServices.create(
                {
                  AWB: AWB,
                  serviceID: 1,
                },
                { transaction: t }
              );
            }
          }

          if (row["Fees On Consignee?"] === 'Yes') {
            await ShipmentServices.create(
              {
                AWB: AWB,
                serviceID: 2,
              },
              { transaction: t }
            );
          }
          else if (row["Fees On Consignee?"] !== 'No') {
            if (subAccountServicesIDs.serviceTypeIDs.includes(2)) {
              await ShipmentServices.create(
                {
                  AWB: AWB,
                  serviceID: 2,
                },
                { transaction: t }
              );
            }
          }

          if (row["Same Day Delivery?"] === 'Yes') {
            await ShipmentServices.create(
              {
                AWB: AWB,
                serviceID: 3,
              },
              { transaction: t }
            );
          }
          else if (row["Same Day Delivery?"] !== 'No') {
            if (subAccountServicesIDs.serviceTypeIDs.includes(3)) {
              await ShipmentServices.create(
                {
                  AWB: AWB,
                  serviceID: 3,
                },
                { transaction: t }
              );
            }
          }

          return {
            transHdrID: newTransactionHdr.ID,
            AWB: AWB,
            mainAccountID: transactions.mainAccountID,
            subAccountID: transactions.subAccountID,
            serviceID: 1,
            statusID: 1,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            creationDate: transactions.creationDate,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: DeliveryBranchIDDelivery,
            toBranchID: ToBranchIDDelivery,
            shipmentTypeID: 1,
            Ref: row["Order Reference"],
            specialInstructions: row["Special Instructions"],
            productID: productTypeID?.productTypeID,
            packageTypeID: await getPackageTypeIDByName(row["Package Type"]),
            noOfPcs: row["#Pieces"],
            contents: row.Contents,
            weight: row.Weight,
            actualWeight: row.Weight,
            Cash: row["Collection Type"] === 'Collect from customer' ? row.Cash : 0,
          }
        })
      );

      const ReturnTransactionData = await Promise.all(
        data.map(async (row: any) => {
          ToBranchIDReturn = await getBranchIDByCityName(row.City);
          DeliveryBranchIDReturn = await getBranchIDByReturnLocationID(pickup.returnLocationID);

          let AWB: any = await generateAWB(transactionHdr.subAccountID);

          return {
            transHdrID: newTransactionHdr.ID,
            AWB: AWB,
            mainAccountID: transactions.mainAccountID,
            subAccountID: transactions.subAccountID,
            serviceID: 2,
            statusID: 1,
            expectedDeliveryDate: transactions.expectedDeliveryDate,
            creationDate: transactions.creationDate,
            lastChangeDate: transactions.lastChangeDate,
            userID: transactions.userID,
            expiryDate: transactions.expiryDate,
            deliveryBranchID: DeliveryBranchIDReturn,
            toBranchID: ToBranchIDReturn,
            shipmentTypeID: 1,
            Ref: row["Return Order Reference"],
            specialInstructions: row["Return Special Instructions"],
            productID: productTypeID?.productTypeID,
            packageTypeID: await getPackageTypeIDByName(row["Return Package Type"]),
            noOfPcs: row["Return #Pieces"],
            contents: row["Return Contents"],
            weight: row["Return Weight"],
            actualWeight: row["Return Weight"],
            Cash: row["Collection Type"] === 'Collect from customer' ? 0 : -row.Cash,
          }
        })
      );

      const deliveryCreatedTransactions = await Transactions.bulkCreate(DeliveryTransactionData, { transaction: t, returning: ['ID', 'AWB'] });
      const returnCreatedTransactions = await Transactions.bulkCreate(ReturnTransactionData, { transaction: t, returning: ['ID', 'AWB'] });

      deliveryCreatedAWBs = deliveryCreatedTransactions.map((transaction) => transaction.AWB);
      returnCreatedAWBs = returnCreatedTransactions.map((transaction) => transaction.AWB);

      createdAWBs.push([...deliveryCreatedAWBs, ...returnCreatedAWBs]);

      const deliveryTransIDs = deliveryCreatedTransactions.map((transaction) => transaction.ID);
      const returnTransIDs = returnCreatedTransactions.map((transaction) => transaction.ID);

      const DeliveryTransactionHistoryData = await Promise.all(
        deliveryTransIDs.map(async (transID, index) => {
          return {
            transID: transID,
            shipmentTypeID: 1,
            statusID: 1,
            auditDate: transactionHistory.auditDate,
            userID: transactionHistory.userID,
            toBranchID: ToBranchIDDelivery,
          }
        })
      );

      //@ts-ignore
      await TransactionHistory.bulkCreate(DeliveryTransactionHistoryData, { transaction: t });

      const ReturnTransactionHistoryData = await Promise.all(
        returnTransIDs.map(async (transID, index) => {
          return {
            transID: transID,
            shipmentTypeID: 1,
            statusID: 1,
            auditDate: transactionHistory.auditDate,
            userID: transactionHistory.userID,
            toBranchID: ToBranchIDReturn,
          }
        })
      );

      //@ts-ignore
      await TransactionHistory.bulkCreate(ReturnTransactionHistoryData, { transaction: t });

      const deliveryContactPersonData = await Promise.all(
        data.map(async (row: any) => {
          return {
            firstName: row["First Name"],
            lastName: row["Last Name"],
          }
        })
      );

      const DeliveryCreatedContactPerson = await ContactPersons.bulkCreate(deliveryContactPersonData, { transaction: t, returning: ['ID'] });


      const returnContactPersonData = await Promise.all(
        data.map(async (row: any) => {
          return {
            firstName: row["First Name"],
            lastName: row["Last Name"],
          }
        })
      );

      const ReturnCreatedContactPerson = await ContactPersons.bulkCreate(returnContactPersonData, { transaction: t, returning: ['ID'] });

      const DeliveryAWBs = deliveryCreatedTransactions.map((transaction) => transaction.AWB);
      const ReturnAWBs = returnCreatedTransactions.map((transaction) => transaction.AWB);

      const DeliveryContactPersonIDs = DeliveryCreatedContactPerson.map((contactPerson) => contactPerson.ID);
      const ReturnContactPersonIDs = ReturnCreatedContactPerson.map((contactPerson) => contactPerson.ID);

      const DeliveryAddressData = await Promise.all(
        DeliveryAWBs.map(async (AWB, index) => {
          return {
            AWB: AWB,
            streetName: data[index]["Street Name"],
            apartmentNumber: data[index]["Apartment#"],
            floorNumber: data[index]["Floor#"],
            buildingNumber: data[index]["Building#"],
            cityID: await getCityIDByCityName(data[index].City),
            postalCode: data[index]["Postal Code"],
            cneeContactPersonID: DeliveryContactPersonIDs[index],
          };
        })
      );

      await Addresses.bulkCreate(DeliveryAddressData, { transaction: t });

      const ReturnAddressData = await Promise.all(
        ReturnAWBs.map(async (AWB, index) => {
          return {
            AWB: AWB,
            streetName: data[index]["Street Name"],
            apartmentNumber: data[index]["Apartment#"],
            floorNumber: data[index]["Floor#"],
            buildingNumber: data[index]["Building#"],
            cityID: await getCityIDByCityName(data[index].City),
            postalCode: data[index]["Postal Code"],
            cneeContactPersonID: ReturnContactPersonIDs[index],
          };
        })
      );

      await Addresses.bulkCreate(ReturnAddressData, { transaction: t });

      const DeliveryContactNumberData = DeliveryContactPersonIDs.map((ContactPersonID, index) => {
        return {
          contactNumber: data[index]["Mobile Number"],
          cneeContactPersonID: ContactPersonID,
          numberTypeID: 1,
        };
      });

      await ContactNumbers.bulkCreate(DeliveryContactNumberData, { transaction: t });

      const ReturnContactNumberData = ReturnContactPersonIDs.map((ContactPersonID, index) => {
        return {
          contactNumber: data[index]["Mobile Number"],
          cneeContactPersonID: ContactPersonID,
          numberTypeID: 1,
        };
      });

      await ContactNumbers.bulkCreate(ReturnContactNumberData, { transaction: t });
    });

    return [DeliveryPickup.ID, ReturnPickup.ID];
  }

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
    addresses: AddressesModel,
    serviceTypeIDs: number[],
    collectionTypeID: number,
    returnRef: string,
    returnPackageTypeID: number,
    returnNoOfPcs: number,
    returnContents: string,
    returnWeight: number,
    returnSpecialInstructions: string
  ): Promise<any> {
    try {

      isVerified = await verified(transactionHdr.subAccountID);

      if (!isVerified) {
        return 'Account is not verified';
      }

      if (transactions.serviceID !== 3) {
        let ToBranchID: any;
        let DeliveryBranchID: any;

        if (transactions.serviceID !== 2) {
          ToBranchID = await getBranchIDByPickupLocationID(pickup.pickupLocationID);
          DeliveryBranchID = await getBranchIDByCityID(addresses.cityID);
        } else {
          DeliveryBranchID = await getBranchIDByReturnLocationID(pickup.returnLocationID);
          ToBranchID = await getBranchIDByCityID(addresses.cityID);
        }

        const result = await sequelize.transaction(async (t) => {
          const AWB = await generateAWB(transactionHdr.subAccountID);
          const RefExists = await checkRefExists(transactions.Ref, transactionHdr.subAccountID);

          const productTypeID = await SubAccounts.findOne({
            attributes: ['productTypeID'],
            where: { ID: transactionHdr.subAccountID }, transaction: t
          });


          if (RefExists !== null) {
            return 'Ref already exists';
          }
          const newTransactionHdr = await TransactionHdr.create(
            {
              mainAccountID: transactionHdr.mainAccountID,
              subAccountID: transactionHdr.subAccountID,
              userID: transactionHdr.userID,
              serviceID: transactionHdr.serviceID,
              creationDate: transactionHdr.creationDate,
              noOfAWBs: 1,
            },
            { transaction: t, returning: ['ID'] } // pass transaction object and specify returning column(s)
          );

          const newPickup = await Pickups.create(
            {
              mainAccountID: pickup.mainAccountID,
              subAccountID: pickup.subAccountID,
              pickupLocationID: pickup.pickupLocationID,
              returnLocationID: pickup.returnLocationID,
              transHdrID: newTransactionHdr.ID,
              pickupTypeID: pickup.pickupTypeID,
              vehicleTypeID: pickup.vehicleTypeID,
              noOfAWBs: 1,
              actualAWBs: 1,
              timeFrom: pickup.timeFrom,
              toTime: pickup.toTime,
              statusID: 1,
              userID: pickup.userID,
              creationDate: pickup.creationDate,
              createdAWBs: 1,
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
              deliveryBranchID: DeliveryBranchID,
              toBranchID: ToBranchID,
              specialInstructions: transactions.specialInstructions,
              packageTypeID: transactions.packageTypeID,
              noOfPcs: transactions.noOfPcs,
              contents: transactions.contents,
              weight: transactions.weight,
              actualWeight: transactions.actualWeight,
              Cash: transactions.serviceID !== 2 ? transactions.Cash : -transactions.Cash,
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
              toBranchID: ToBranchID,
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


          if (serviceTypeIDs.length > 0) {
            for (let i = 0; i < serviceTypeIDs.length; i++) {
              await ShipmentServices.create(
                {
                  AWB: newTransaction.AWB,
                  serviceID: serviceTypeIDs[i],
                },
                { transaction: t }
              );
            }
          }

          return [newTransaction.AWB];
        });

        return result;
      }
      else {
        let ToBranchIDDelivery: any;
        let DeliveryBranchIDDelivery: any;

        let ToBranchIDReturn: any;
        let DeliveryBranchIDReturn: any;


        ToBranchIDDelivery = await getBranchIDByPickupLocationID(pickup.pickupLocationID);
        DeliveryBranchIDDelivery = await getBranchIDByCityID(addresses.cityID);

        ToBranchIDReturn = await getBranchIDByCityID(addresses.cityID);
        DeliveryBranchIDReturn = await getBranchIDByReturnLocationID(pickup.returnLocationID);


        const result = await sequelize.transaction(async (t) => {
          const RefExists = await checkRefExists(transactions.Ref, transactionHdr.subAccountID);
          const ReturnRefExists = await checkRefExists(returnRef, transactionHdr.subAccountID);

          const productTypeID = await SubAccounts.findOne({
            attributes: ['productTypeID'],
            where: { ID: transactionHdr.subAccountID }, transaction: t
          });

          if (RefExists !== null || ReturnRefExists !== null) {
            return 'Ref already exists';
          }

          const newTransactionHdr = await TransactionHdr.create(
            {
              mainAccountID: transactionHdr.mainAccountID,
              subAccountID: transactionHdr.subAccountID,
              userID: transactionHdr.userID,
              serviceID: transactionHdr.serviceID,
              creationDate: transactionHdr.creationDate,
              noOfAWBs: 2,
            },
            { transaction: t, returning: ['ID'] } // pass transaction object and specify returning column(s)
          );

          const pickupData = [
            {
              mainAccountID: pickup.mainAccountID,
              subAccountID: pickup.subAccountID,
              pickupLocationID: pickup.pickupLocationID,
              transHdrID: newTransactionHdr.ID,
              pickupTypeID: pickup.pickupTypeID,
              vehicleTypeID: pickup.vehicleTypeID,
              noOfAWBs: 1,
              actualAWBs: 1,
              timeFrom: pickup.timeFrom,
              toTime: pickup.toTime,
              statusID: 1,
              userID: pickup.userID,
              creationDate: pickup.creationDate,
              createdAWBs: 1,
              Notes: pickup.Notes,
            },
            {
              mainAccountID: pickup.mainAccountID,
              subAccountID: pickup.subAccountID,
              returnLocationID: pickup.returnLocationID,
              transHdrID: newTransactionHdr.ID,
              pickupTypeID: pickup.pickupTypeID,
              vehicleTypeID: pickup.vehicleTypeID,
              noOfAWBs: 1,
              actualAWBs: 1,
              timeFrom: pickup.timeFrom,
              toTime: pickup.toTime,
              statusID: 1,
              userID: pickup.userID,
              creationDate: pickup.creationDate,
              createdAWBs: 1,
              Notes: pickup.Notes,
            },
          ];

          const newPickups = await Pickups.bulkCreate(pickupData, { transaction: t, returning: ['ID'] });

          const newDeliveryPickup = newPickups[0];
          const newReturnPickup = newPickups[1];

          const pickupHistoryData = [
            {
              pickupID: newDeliveryPickup.ID,
              statusID: 1,
              actionTime: pickupHistory.actionTime,
              userID: pickupHistory.userID,
            },
            {
              pickupID: newReturnPickup.ID,
              statusID: 1,
              actionTime: pickupHistory.actionTime,
              userID: pickupHistory.userID,
            },
          ];

          await PickupHistory.bulkCreate(pickupHistoryData, { transaction: t });


          const transactionData = [
            {
              transHdrID: newTransactionHdr.ID,
              AWB: await generateAWB(transactionHdr.subAccountID),
              Ref: transactions.Ref,
              mainAccountID: transactions.mainAccountID,
              subAccountID: transactions.subAccountID,
              serviceID: 1,
              shipmentTypeID: 1,
              statusID: 1,
              expectedDeliveryDate: transactions.expectedDeliveryDate,
              productID: productTypeID?.productTypeID,
              creationDate: transactions.creationDate,
              lastChangeDate: transactions.lastChangeDate,
              userID: transactions.userID,
              expiryDate: transactions.expiryDate,
              deliveryBranchID: DeliveryBranchIDDelivery,
              toBranchID: ToBranchIDDelivery,
              specialInstructions: transactions.specialInstructions,
              packageTypeID: transactions.packageTypeID,
              noOfPcs: transactions.noOfPcs,
              contents: transactions.contents,
              weight: transactions.weight,
              actualWeight: transactions.actualWeight,
              Cash: collectionTypeID == 1 ? transactions.Cash : 0,
            },
            {
              transHdrID: newTransactionHdr.ID,
              AWB: await generateAWB(transactionHdr.subAccountID),
              Ref: returnRef,
              mainAccountID: transactions.mainAccountID,
              subAccountID: transactions.subAccountID,
              serviceID: 2,
              shipmentTypeID: 1,
              statusID: 1,
              expectedDeliveryDate: transactions.expectedDeliveryDate,
              productID: productTypeID?.productTypeID,
              creationDate: transactions.creationDate,
              lastChangeDate: transactions.lastChangeDate,
              userID: transactions.userID,
              expiryDate: transactions.expiryDate,
              deliveryBranchID: DeliveryBranchIDReturn,
              toBranchID: ToBranchIDReturn,
              specialInstructions: returnSpecialInstructions,
              packageTypeID: returnPackageTypeID,
              noOfPcs: returnNoOfPcs,
              contents: returnContents,
              weight: returnWeight,
              actualWeight: returnWeight,
              Cash: collectionTypeID == 2 ? -transactions.Cash : 0,
            },
          ];

          const newTransactions = await Transactions.bulkCreate(transactionData, { transaction: t, returning: ['ID', 'AWB'] });

          // Assuming you want to use the generated IDs in the next steps
          const newDeliveryTransaction = newTransactions[0]; // The first transaction
          const newReturnTransaction = newTransactions[1]; // The second transaction

          const transactionHistoryData = [
            {
              transID: newDeliveryTransaction.ID,
              shipmentTypeID: 1,
              statusID: 1,
              auditDate: transactionHistory.auditDate,
              userID: transactionHistory.userID,
              toBranchID: ToBranchIDDelivery,
            },
            {
              transID: newReturnTransaction.ID,
              shipmentTypeID: 1,
              statusID: 1,
              auditDate: transactionHistory.auditDate,
              userID: transactionHistory.userID,
              toBranchID: ToBranchIDReturn,
            },
          ];

          await TransactionHistory.bulkCreate(transactionHistoryData, { transaction: t });

          const contactPersonData = [
            {
              firstName: contactPersons.firstName,
              lastName: contactPersons.lastName,
            },
            {
              firstName: contactPersons.firstName,
              lastName: contactPersons.lastName,
            },
          ];

          const newContactPersons = await ContactPersons.bulkCreate(contactPersonData, { transaction: t, returning: ['ID'] });

          const newDeliveryContactPerson = newContactPersons[0];
          const newReturnContactPerson = newContactPersons[1];

          const contactNumberData = [
            {
              contactNumber: contactNumbers.contactNumber,
              cneeContactPersonID: newDeliveryContactPerson.ID,
              numberTypeID: contactNumbers.numberTypeID,
            },
            {
              contactNumber: contactNumbers.contactNumber,
              cneeContactPersonID: newReturnContactPerson.ID,
              numberTypeID: contactNumbers.numberTypeID,
            },
          ];

          await ContactNumbers.bulkCreate(contactNumberData, { transaction: t });

          const addressData = [
            {
              AWB: newDeliveryTransaction.AWB,
              streetName: addresses.streetName,
              apartmentNumber: addresses.apartmentNumber,
              floorNumber: addresses.floorNumber,
              buildingNumber: addresses.buildingNumber,
              cityID: addresses.cityID,
              postalCode: addresses.postalCode,
              cneeContactPersonID: newDeliveryContactPerson.ID,
              longitude: addresses.longitude,
              latitude: addresses.latitude,
            },
            {
              AWB: newReturnTransaction.AWB,
              streetName: addresses.streetName,
              apartmentNumber: addresses.apartmentNumber,
              floorNumber: addresses.floorNumber,
              buildingNumber: addresses.buildingNumber,
              cityID: addresses.cityID,
              postalCode: addresses.postalCode,
              cneeContactPersonID: newReturnContactPerson.ID,
              longitude: addresses.longitude,
              latitude: addresses.latitude,
            },
          ];

          await Addresses.bulkCreate(addressData, { transaction: t });

          if (serviceTypeIDs.length > 0) {
            for (let i = 0; i < serviceTypeIDs.length; i++) {
              await ShipmentServices.create(
                {
                  AWB: newDeliveryTransaction.AWB,
                  serviceID: serviceTypeIDs[i],
                },
                { transaction: t }
              );
            }
          }

          return [newDeliveryTransaction.AWB, newReturnTransaction.AWB];
        });

        return result;
      }

    } catch (err) {
      // console.log(err);

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
    try {
      const workbook = xlsx.readFile(excelPath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any = xlsx.utils.sheet_to_json(sheet, {
        header: [
          'First Name',
          'Last Name',
          'Mobile Number',
          'City',
          'Street Name',
          'Building#',
          'Floor#',
          'Apartment#',
          'Postal Code',
          'Service',
          'Collection Type',
          'Cash',
          'Package Type',
          '#Pieces',
          'Weight',
          'Contents',
          'Special Instructions',
          'Order Reference',
          'Return Package Type',
          'Return #Pieces',
          'Return Weight',
          'Return Contents',
          'Return Special Instructions',
          'Return Order Reference',
          'Allow Opening Packages?',
          'Fees On Consignee?',
          'Same Day Delivery?'
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
      const flattenedAWBS = [].concat(...createdAWBs);

      if (!isVerified) {
        return 'Account is not verified';
      }

      if (RefExists !== null) {
        return `Ref ${RefExists} already exists`;
      }
      return [pickupIDs, flattenedAWBS];
    }
    catch (err) {
      console.log(err);
      throw new Error(`Could not add new TransactionHdr. Error: ${err}`);
    }

  }
}
