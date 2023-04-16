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
    const transactionHdr = <TransactionHdrModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      userID: req.body.userID,
      creationDate: currentDate,
      noOfAWBs: req.body.noOfAWBs,
    });

    const pickup = <PickupsModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      pickupLocationID: req.body.pickupLocationID,
      pickupTypeID: req.body.pickupTypeID,
      vehicleTypeID: req.body.vehicleTypeID,
      noOfAWBs: req.body.noOfAWBs,
      actualAWBs: req.body.actualAWBs,
      timeFrom: req.body.timeFrom,
      toTime: req.body.toTime,
      userID: req.body.userID,
      creationDate: currentDate,
      Notes: req.body.pickupNotes,
    });

    const pickupHistory = <PickupHistoryModel>(<unknown>{
      actionTime: currentDate,
      userID: req.body.userID,
    });

    const transaction = <TransactionsModel>(<unknown>{
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      shipmentTypeID: req.body.shipmentTypeID,
      expectedDeliveryDate: expectedDeliveryDate,
      productID: req.body.productID,
      creationDate: currentDate,
      lastChangeDate: currentDate,
      userID: req.body.userID,
      expiryDate: expiryDate,
      deliveryBranchID: req.body.deliveryBranchID,
      toBranchID: req.body.toBranchID,
      specialInstructions: req.body.specialInstructions,
      packageTypeID: req.body.packageTypeID,
      noOfPcs: req.body.noOfPcs,
      contents: req.body.contents,
      weight: req.body.weight,
      Cash: req.body.Cash,
    });

    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      shipmentTypeID: req.body.shipmentTypeID,
      auditDate: currentDate,
      userID: req.body.userID,
      toBranchID: req.body.toBranchID,
    });

    const contactPerson = <ContactPersonsModel>(<unknown>{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const contactNumber = <ContactNumbersModel>(<unknown>{
      contactNumber: req.body.contactNumber,
      numberTypeID: req.body.numberTypeID,
    });

    const address = <AddressesModel>(<unknown>{
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });

    const result = await createShipmentsController.createSingleShipment(
      transactionHdr,
      pickup,
      pickupHistory,
      transaction,
      transactionHistory,
      contactPerson,
      contactNumber,
      address
    );
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const createMultipleShipments = async (req: Request, res: Response) => {
  try {
    const fileName = req.body.fileName;
    const excelPath = path.join(__dirname, '../../../uploads/', fileName);
    const transactionHdr = <TransactionHdrModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.params.subAccountID,
      userID: req.body.userID,
      creationDate: currentDate,
    });

    const pickup = <PickupsModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.params.subAccountID,
      pickupLocationID: req.body.pickupLocationID,
      pickupTypeID: req.body.pickupTypeID,
      vehicleTypeID: req.body.vehicleTypeID,
      timeFrom: req.body.timeFrom,
      toTime: req.body.toTime,
      userID: req.body.userID,
      creationDate: currentDate,
      Notes: req.body.pickupNotes,
    });

    const pickupHistory = <PickupHistoryModel>(<unknown>{
      actionTime: currentDate,
      userID: req.body.userID,
    });

    const transaction = <TransactionsModel>(<unknown>{
      subAccountID: req.params.subAccountID,
      mainAccountID: req.body.mainAccountID,
      userID: req.body.userID,
      expectedDeliveryDate: expectedDeliveryDate,
      creationDate: currentDate,
      lastChangeDate: currentDate,
      expiryDate: expiryDate,
      deliveryBranchID: req.body.deliveryBranchID,
      toBranchID: req.body.toBranchID,
    });

    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      auditDate: currentDate,
      userID: req.body.userID,
      toBranchID: req.body.toBranchID,
    });

    const contactNumber = <ContactNumbersModel>(<unknown>{
      numberTypeID: req.body.numberTypeID,
    });

    const result = await createShipmentsController.CreateMultipleShipments(
      excelPath,
      transactionHdr,
      pickup,
      pickupHistory,
      transaction,
      transactionHistory,
      contactNumber
    );

    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:47 ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const CreateShipmentServicesRouter = (app: express.Application) => {
  app.post('/create-single-shipment', createSingleShipment);
  app.post('/create-multiple-shipment/:subAccountID', createMultipleShipments);
};
export default CreateShipmentServicesRouter;
