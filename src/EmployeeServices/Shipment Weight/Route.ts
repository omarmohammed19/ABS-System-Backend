import express, { Request, Response } from 'express';
import { ShipmentWeightController } from './Controller';
import { TransactionsModel } from '../../Backend/ship_Transactions/Model';

const shipmentWeightController = new ShipmentWeightController();

const getShipmentWeightByAWB = async (req: Request, res: Response) => {
  try {
    const result = await shipmentWeightController.getShipmentWeightByAWB(req.params.AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const shipmentWeightRouter = (app: express.Application) => {
  app.get('/shipment-weight-by-AWB/:AWB', getShipmentWeightByAWB);
};

export default shipmentWeightRouter;
