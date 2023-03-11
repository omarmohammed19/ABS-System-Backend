import express, { Request, Response } from 'express';
import { PickupTypesController } from './Controller';
import { PickupTypesModel } from './Model';

const pickupTypesController = new PickupTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pickupTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pickupTypesController.getPickupTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const pickupType = <PickupTypesModel>{
      enPickupType: req.body.enPickupType,
      arPickupType: req.body.arPickupType,
      Notes: req.body.Notes,
    };
    const result = await pickupTypesController.create(pickupType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const pickupType = <PickupTypesModel>{
      ID: Number(req.params.ID),
      enPickupType: req.body.enPickupType,
      arPickupType: req.body.arPickupType,
      Notes: req.body.Notes,
    };
    const result = await pickupTypesController.update(pickupType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await pickupTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await pickupTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const pickupTypesRouter = (app: express.Application) => {
  app.get('/pickupTypes', getAll);
  app.get('/pickupTypes/:ID', getById);
  app.post('/pickupTypes', create);
  app.put('/pickupTypes/:ID', update);
  app.put('/pickupTypes/deactivate/:ID', deactivate);
  app.put('/pickupTypes/activate/:ID', activate);
};

export default pickupTypesRouter;
