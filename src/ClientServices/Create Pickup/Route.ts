import express, { Request, Response } from 'express';
import { CreatePickupController } from './Controller';

const createPickupController = new CreatePickupController();

const getPickup_ReturnLocationsBySubAccountID = async (req: Request, res: Response) => {
  try {
    const subAccountID = Number(req.params.subAccountID);
    const locationType = req.body.locationType;
    const result = await createPickupController.getPickup_ReturnLocationsBySubAccountID(locationType, subAccountID);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:13 ~ constgetPickup_ReturnLocationsBySubAccountID= ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const CreatePickupServicesRouter = (app: express.Application) => {
  app.post('/pickup-return-locations-by-subAccountID/:subAccountID/', getPickup_ReturnLocationsBySubAccountID);
};
export default CreatePickupServicesRouter;
