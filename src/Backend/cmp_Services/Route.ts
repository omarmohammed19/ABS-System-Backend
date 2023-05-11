import express, { Request, Response } from 'express';
import { ServicesController } from './Controller';
import { ServicesModel } from './Model';

const servicesController = new ServicesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await servicesController.index(language, Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await servicesController.getPackageTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const packageType = <ServicesModel>{
      enService: req.body.enService,
      arService: req.body.arService,
      Notes: req.body.Notes,
    };
    const result = await servicesController.create(packageType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const packageType = <ServicesModel>{
      ID: Number(req.params.ID),
      enService: req.body.enService,
      arService: req.body.arService,
      Notes: req.body.Notes,
    };
    const result = await servicesController.update(packageType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await servicesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await servicesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const servicesRouter = (app: express.Application) => {
  app.get('/services/:isActive', getAll);
  app.get('/services/:ID', getById);
  app.post('/services', create);
  app.put('/services/:ID', update);
  app.put('/services/de-activate/:ID', deactivate);
  app.put('/services/activate/:ID', activate);
};

export default servicesRouter;
