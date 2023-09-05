import express, { Request, Response } from 'express';
import { PickupsController } from './Controller';

const pickupsController = new PickupsController();

const getByBranchID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pickupsController.getPickupsByBranchID(Number(req.params.branchID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const pickupsEmployeeRouter = (app: express.Application) => {
  app.get('/pickups-for-employee-by-branchID/:branchID', getByBranchID);
};

export default pickupsEmployeeRouter;
