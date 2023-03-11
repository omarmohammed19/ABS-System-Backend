import express, { Request, Response } from 'express';
import { ServiceTypesController } from './Controller';
import { ServiceTypesModel } from './Model';

const serviceTypesController = new ServiceTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await serviceTypesController.index(language);
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
    const result = await serviceTypesController.getServiceTypesById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const salesChannelTypes = <ServiceTypesModel>{
      enServiceType: req.body.enServiceType,
      arServiceType: req.body.arServiceType,
      Notes: req.body.Notes
    };
    const result = await serviceTypesController.create(salesChannelTypes);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const salesChannelTypes = <ServiceTypesModel>{
      ID: Number(req.params.ID),
      enServiceType: req.body.enServiceType,
      arServiceType: req.body.arServiceType,
      Notes: req.body.Notes
    };
    const result = await serviceTypesController.update(salesChannelTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await serviceTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await serviceTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const serviceTypesRouter = (app: express.Application) => {
  app.get('/serviceTypes', getAll);
  app.get('/serviceTypes/:ID', getById);
  app.post('/serviceTypes', create);
  app.put('/serviceTypes/:ID', update);
  app.put('/serviceTypes/deactivate/:ID', deactivate);
  app.put('/serviceTypes/activate/:ID', activate);
};

export default serviceTypesRouter;
