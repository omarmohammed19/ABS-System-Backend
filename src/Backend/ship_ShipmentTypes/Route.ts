import express, { Request, Response } from 'express';
import { ShipmentTypesController } from './Controller';
import { ShipmentTypesModel } from './Model';

const shipmentTypesController = new ShipmentTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await shipmentTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await shipmentTypesController.getShipmentTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const shipmentType = <ShipmentTypesModel>{
      enShipmentType: req.body.enShipmentType,
      arShipmentType: req.body.arShipmentType,
      Notes: req.body.Notes,
    };
    const result = await shipmentTypesController.create(shipmentType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const shipmentType = <ShipmentTypesModel>{
      ID: Number(req.params.ID),
      enShipmentType: req.body.enShipmentType,
      arShipmentType: req.body.arShipmentType,
      Notes: req.body.Notes,
    };
    const result = await shipmentTypesController.update(shipmentType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await shipmentTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await shipmentTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const shipmentTypesRouter = (app: express.Application) => {
  app.get('/shipment-types', getAll);
  app.get('/shipment-types/:ID', getById);
  app.post('/shipment-types', create);
  app.put('/shipment-types/:ID', update);
  app.put('/shipment-types/de-activate/:ID', deactivate);
  app.put('/shipment-types/activate/:ID', activate);
};

export default shipmentTypesRouter;
