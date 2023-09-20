import express, { Request, Response } from 'express';
import { CreateShipmentsController } from './Controller';
import { Sequelize } from 'sequelize';
import { TransactionHdrModel } from '../../Backend/ship_TransactionHdr/Model';
import { PickupsModel } from '../../Backend/ship_Pickups/Model';
import { PickupHistoryModel } from '../../Backend/ship_PickupHistory/Model';
import { TransactionsModel } from '../../Backend/ship_Transactions/Model';
import { TransactionHistoryModel } from '../../Backend/ship_TransactionHistory/Model';
import { ContactPersonsModel } from '../../Backend/cnee_ContactPersons/Model';
import { ContactNumbersModel } from '../../Backend/cnee_ContactNumbers/Model';
import { AddressesModel } from '../../Backend/cnee_Addresses/Model';
import path from 'path';

const createShipmentsController = new CreateShipmentsController();

const currentDate = Sequelize.literal('GETDATE()');
const expectedDeliveryDate = Sequelize.literal('GETDATE()+1');
const expiryDate = Sequelize.literal('GETDATE()+3');

const createSingleShipment = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.body.subAccountID;
    //@ts-ignore
    const mainAccountID = req.body.mainAccountID;
    //@ts-ignore
    const userID = req.userID;

    const creationDate = req.body.creationDate ? req.body.creationDate : currentDate;

    const transactionHdr = <TransactionHdrModel>(<unknown>{
      mainAccountID: mainAccountID,
      subAccountID: subAccountID,
      userID: userID,
      serviceID: req.body.serviceID,
      creationDate: creationDate,
    });

    const pickup = <PickupsModel>(<unknown>{
      mainAccountID: mainAccountID,
      subAccountID: subAccountID,
      pickupLocationID: req.body.pickupLocationID,
      returnLocationID: req.body.returnLocationID,
      branchID: req.body.branchID,
      pickupTypeID: req.body.pickupTypeID,
      vehicleTypeID: req.body.vehicleTypeID,
      timeFrom: req.body.timeFrom,
      toTime: req.body.toTime,
      userID: userID,
      creationDate: creationDate,
      Notes: req.body.pickupNotes,
    });

    const pickupHistory = <PickupHistoryModel>(<unknown>{
      actionTime: currentDate,
      userID: userID,
    });

    const transaction = <TransactionsModel>(<unknown>{
      AWB: req.body.AWB,
      Ref: req.body.Ref,
      mainAccountID: mainAccountID,
      subAccountID: subAccountID,
      serviceID: req.body.serviceID,
      expectedDeliveryDate: expectedDeliveryDate,
      creationDate: creationDate,
      lastChangeDate: currentDate,
      userID: userID,
      expiryDate: expiryDate,
      specialInstructions: req.body.specialInstructions,
      packageTypeID: req.body.packageTypeID,
      noOfPcs: req.body.noOfPcs,
      contents: req.body.contents,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      // actualWeight: req.body.actualWeight,
      Cash: req.body.Cash,
    });

    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      auditDate: currentDate,
      userID: userID,
    });

    const contactPerson = <ContactPersonsModel>(<unknown>{
      subAccountID: subAccountID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const contactNumber = <ContactNumbersModel>(<unknown>{
      contactNumber: req.body.contactNumber,
      numberTypeID: req.body.numberTypeID,
    });

    const address = <AddressesModel>(<unknown>{
      subAccountID: subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });

    const serviceTypeIDs = req.body.serviceTypeIDs;

    const collectionTypeID = req.body.collectionTypeID;
    const returnRef = req.body.returnRef;
    const returnPackageTypeID = req.body.returnPackageTypeID;
    const returnNoOfPcs = req.body.returnNoOfPcs;
    const returnContents = req.body.returnContents;
    // const returnWeight = req.body.returnWeight;
    const returnLength = req.body.returnLength;
    const returnWidth = req.body.returnWidth;
    const returnHeight = req.body.returnHeight;
    // const returnActualWeight = req.body.returnWeight;
    const returnSpecialInstructions = req.body.returnSpecialInstructions;

    const result = await createShipmentsController.createSingleShipment(
      transactionHdr,
      pickup,
      pickupHistory,
      transaction,
      transactionHistory,
      contactPerson,
      contactNumber,
      address,
      serviceTypeIDs,
      collectionTypeID,
      returnRef,
      returnPackageTypeID,
      returnNoOfPcs,
      returnContents,
      // returnWeight,
      returnLength,
      returnWidth,
      returnHeight,
      returnSpecialInstructions
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const createMultipleShipments = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.body.subAccountID;
    //@ts-ignore
    const mainAccountID = req.body.mainAccountID;
    //@ts-ignore
    const userID = req.userID;
    const fileName = req.body.fileName;
    const excelPath = path.join(__dirname, '../../../uploads/', fileName);

    const transactionHdr = <TransactionHdrModel>(<unknown>{
      mainAccountID: mainAccountID,
      subAccountID: subAccountID,
      userID: userID,
      creationDate: currentDate,
    });

    const pickup = <PickupsModel>(<unknown>{
      mainAccountID: mainAccountID,
      subAccountID: subAccountID,
      pickupLocationID: req.body.pickupLocationID,
      returnLocationID: req.body.returnLocationID,
      branchID: req.body.branchID,
      pickupTypeID: req.body.pickupTypeID,
      vehicleTypeID: req.body.vehicleTypeID,
      timeFrom: req.body.timeFrom,
      toTime: req.body.toTime,
      userID: userID,
      creationDate: currentDate,
      Notes: req.body.pickupNotes,
    });

    const pickupHistory = <PickupHistoryModel>(<unknown>{
      actionTime: currentDate,
      userID: userID,
    });

    const transaction = <TransactionsModel>(<unknown>{
      subAccountID: subAccountID,
      mainAccountID: mainAccountID,
      userID: userID,
      expectedDeliveryDate: expectedDeliveryDate,
      creationDate: currentDate,
      lastChangeDate: currentDate,
      expiryDate: expiryDate,
    });

    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      auditDate: currentDate,
      userID: userID,
    });

    const result = await createShipmentsController.CreateMultipleShipments(
      excelPath,
      transactionHdr,
      pickup,
      pickupHistory,
      transaction,
      transactionHistory
    );

    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:47 Shipments Controller ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const EmpployeeCreateShipmentServicesRouter = (app: express.Application) => {
  app.post('/employee-create-single-shipment', createSingleShipment);
  app.post('/employee-create-multiple-shipment', createMultipleShipments);
};
export default EmpployeeCreateShipmentServicesRouter;
