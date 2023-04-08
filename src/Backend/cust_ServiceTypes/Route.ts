import express, { Request, Response } from 'express';
import { ServiceTypesController } from './Controller';
import { ServiceTypesModel } from './Model';

const serviceTypesController = new ServiceTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await serviceTypesController.index(language, Number(req.params.isActive));
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
    const result = await serviceTypesController.getServiceTypeById(Number(req.params.ID), language);
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
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const salesChannelTypes = <ServiceTypesModel>{
      ID: Number(req.params.ID),
      enServiceType: req.body.enServiceType,
      arServiceType: req.body.arServiceType,
      Notes: req.body.Notes
    };
    const result = await serviceTypesController.update(salesChannelTypes, language);
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
  app.get('/service-types/:isActive', getAll);
  app.get('/service-types-by-ID/:ID', getById);
  app.post('/service-types', create);
  app.put('/service-types/:ID', update);
  app.put('/service-types/de-activate/:ID', deactivate);
  app.put('/service-types/activate/:ID', activate);
};

export default serviceTypesRouter;
