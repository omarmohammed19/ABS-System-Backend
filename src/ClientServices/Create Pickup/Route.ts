import express, { Request, Response } from 'express';
import { CreatePickupController } from './Controller';
import { Sequelize } from 'sequelize';
import { TransactionHdrModel } from '../../Backend/ship_TransactionHdr/Model';
import { PickupsModel } from '../../Backend/ship_Pickups/Model';
import { PickupHistoryModel } from '../../Backend/ship_PickupHistory/Model';

const createPickupController = new CreatePickupController();

const getPickup_ReturnLocationsBySubAccountID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = Number(req.params.subAccountID) ? Number(req.params.subAccountID) : req.subAccountID;
    const locationType = req.body.locationType;
    const result = await createPickupController.getPickup_ReturnLocationsBySubAccountID(locationType, subAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const createPickup = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.body.subAccountID ? req.body.subAccountID : req.subAccountID;
    //@ts-ignore
    const mainAccountID = req.body.mainAccountID ? req.body.mainAccountID : req.mainAccountID;
    //@ts-ignore
    const userID = req.userID;

    const currentDate = Sequelize.literal('GETDATE()');
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
      branchID: req.body.branchID,
      pickupTypeID: req.body.pickupTypeID,
      vehicleTypeID: req.body.vehicleTypeID,
      noOfAWBs: req.body.noOfAWBs,
      timeFrom: req.body.timeFrom,
      toTime: req.body.toTime,
      userID: userID,
      creationDate: currentDate,
      Notes: req.body.Notes,
    });

    const pickupHistory = <PickupHistoryModel>(<unknown>{
      actionTime: currentDate,
      userID: userID,
    });

    const result = await createPickupController.CreatePickup(transactionHdr, pickup, pickupHistory);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const CreatePickupServicesRouter = (app: express.Application) => {
  app.post('/pickup-return-locations-by-subAccountID/:subAccountID?', getPickup_ReturnLocationsBySubAccountID);
  app.post('/create-pickup', createPickup);
};
export default CreatePickupServicesRouter;
