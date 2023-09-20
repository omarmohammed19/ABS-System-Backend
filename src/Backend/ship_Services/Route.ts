import express, { Request, Response } from 'express';
import { ShipmentServicesModel } from './Model';
import { ShipmentServicesController } from './Controller';

const shipmentServicesController = new ShipmentServicesController();

const getByAWB = async (req: Request, res: Response) => {
  try {
    const result = await shipmentServicesController.getServicesByAWB(req.params.AWB);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const shipServicesRouter = (app: express.Application) => {
  app.get('/ship_Services/:AWB', getByAWB);
};

export default shipServicesRouter;
