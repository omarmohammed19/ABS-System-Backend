import express, { Request, Response } from 'express';
import { PickupsController } from './Controller';
import { PickupsModel } from './Model';
import Sequalize from 'sequelize';
import moment from 'moment';

const pickupsController = new PickupsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pickupsController.index(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pickupsController.getPickupsByID(Number(req.params.PickupID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const date = moment(req.body.timeFrom, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss');
    console.log('🚀 ~ file: Route.ts:36 ~ create ~ date:', date);
    const pickup = <PickupsModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      pickupLocationID: req.body.pickupLocationID,
      transHdrID: req.body.transHdrID,
      pickupTypeID: req.body.pickupTypeID,
      vehicleTypeID: req.body.vehicleTypeID,
      noOfAWBs: req.body.noOfAWBs,
      actualAWBs: req.body.actualAWBs,
      timeFrom: moment(req.body.timeFrom, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      toTime: moment(req.body.toTime, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
      statusID: req.body.statusID,
      userID: req.body.userID,
      creationDate: currentDate,
      assignedBy: req.body.assignedBy,
      assignedTo: req.body.assignedTo,
      createdAWBs: req.body.createdAWBs,
      Notes: req.body.Notes,
    });
    const result = await pickupsController.create(pickup);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:57 ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

// const update = async (req: Request, res: Response) => {
//   try {
//     const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
//     const pickup = <PickupsModel>(<unknown>{
//       ID: req.params.ID,
//       enStatus: req.body.enStatus,
//       arStatus: req.body.arStatus,
//       custDisplayedStatusID: req.body.custDisplayedStatusID,
//       requireReason: req.body.requireReason,
//       Notes: req.body.Notes,
//     });
//     const result = await pickupsController.update(language, pickup);
//     res.json(result);
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// };

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await pickupsController.deactivate(Number(req.params.PickupID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await pickupsController.activate(Number(req.params.PickupID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const pickupsRouter = (app: express.Application) => {
  app.get('/pickup/:isActive/:limit?', getAll);
  app.get('/pickup-by-ID/:PickupID', getById);
  app.post('/pickup', create);
  // app.put('/pickup/:ID', update);
  app.put('/pickup/deactivate/:PickupID', deactivate);
  app.put('/pickup/activate/:PickupID', activate);
};

export default pickupsRouter;
