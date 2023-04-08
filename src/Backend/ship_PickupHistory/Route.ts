import express, { Request, Response } from 'express';
import { PickupHistoryController } from './Controller';
import { PickupHistoryModel } from './Model';
import Sequalize from 'sequelize';
import moment from 'moment';

const pickupHistoryController = new PickupHistoryController();

// const getAll = async (req: Request, res: Response) => {
//   try {
//     const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
//     const result = await pickupHistoryController.index(language, Number(req.params.isActive), Number(req.params.limit));
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(400);
//     res.json(error);
//   }
// };

// const getById = async (req: Request, res: Response) => {
//   try {
//     const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
//     const result = await pickupHistoryController.getPickupsByID(Number(req.params.PickupID), language);
//     res.json(result);
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// };

const create = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const pickupHistory = <PickupHistoryModel>(<unknown>{
      pickupID: req.body.pickupID,
      statusID: req.body.statusID,
      actionTime: currentDate,
      userID: req.body.userID,
      runnerID: req.body.runnerID,
      reasonID: req.body.reasonID,
    });

    const result = await pickupHistoryController.create(pickupHistory);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:47 ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

// const update = async (req: Request, res: Response) => {
//   try {
//     const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
//     const pickupHistory = <PickupHistoryModel>(<unknown>{
//       ID: req.params.ID,
//       mainAccountID: req.body.mainAccountID,
//       subAccountID: req.body.subAccountID,
//       pickupLocationID: req.body.pickupLocationID,
//       transHdrID: req.body.transHdrID,
//       pickupTypeID: req.body.pickupTypeID,
//       vehicleTypeID: req.body.vehicleTypeID,
//       noOfAWBs: req.body.noOfAWBs,
//       actualAWBs: req.body.actualAWBs,
//       timeFrom: req.body.timeFrom,
//       toTime: req.body.toTime,
//       statusID: req.body.statusID,
//       userID: req.body.userID,
//       creationDate: req.body.creationDate,
//       assignedBy: req.body.assignedBy,
//       assignedTo: req.body.assignedTo,
//       createdAWBs: req.body.createdAWBs,
//       Notes: req.body.Notes,
//     });
//     const result = await pickupHistoryController.update(language, pickupHistory);
//     res.json(result);
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// };

// const updatePickedUpDate = async (req: Request, res: Response) => {
//   try {
//     const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
//     const currentDate = Sequalize.literal('GETDATE()');
//     const pickupHistory = <PickupHistoryModel>(<unknown>{
//       ID: req.params.ID,
//       pickedUpDate: currentDate,
//     });
//     const result = await pickupHistoryController.update(language, pickupHistory);
//     res.json(result);
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// };

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await pickupHistoryController.deactivate(Number(req.params.PickupID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await pickupHistoryController.activate(Number(req.params.PickupID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const pickupHistoryRouter = (app: express.Application) => {
  // app.get('/pickupHistory/:isActive/:limit?', getAll);
  // app.get('/pickupHistory-by-ID/:PickupID', getById);
  app.post('/pickupHistory', create);
  // app.put('/pickupHistory/:ID', update);
  // app.put('/pickupHistory-picked-up-date/:ID', updatePickedUpDate);
  app.put('/pickupHistory/deactivate/:PickupID', deactivate);
  app.put('/pickupHistory/activate/:PickupID', activate);
};

export default pickupHistoryRouter;
