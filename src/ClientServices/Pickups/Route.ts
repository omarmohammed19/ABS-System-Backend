import express, { Request, Response } from 'express';
import { PickupsController } from './Controller';

const pickupsController = new PickupsController();

const getHistoryPickups = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const limit = Number(req.params.limit);
    const result = await pickupsController.getHistoryPickups(language, subAccountID, limit);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getUpcomingPickups = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const limit = Number(req.params.limit);
    const result = await pickupsController.getUpcomingPickups(language, subAccountID, limit);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getAWBsByPickupID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const PickupID = Number(req.params.PickupID);
    const result = await pickupsController.getAWBsByPickupID(language, subAccountID, PickupID);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const pickupServicesRouter = (app: express.Application) => {
  app.get('/history-pickups/:limit?', getHistoryPickups);
  app.get('/upcoming-pickups/:limit?', getUpcomingPickups);
  app.get('/awbs-by-pickup-id/:PickupID', getAWBsByPickupID);
};
export default pickupServicesRouter;
