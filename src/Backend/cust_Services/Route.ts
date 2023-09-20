import express, { Request, Response } from 'express';
import { ServicesController } from './Controller';
import { ServicesModel } from './Model';

const servicesController = new ServicesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await servicesController.index(language, Number(req.params.isActive), Number(req.params.limit));
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
    const result = await servicesController.getServicesById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountId = async (req: Request, res: Response) => {
  try {
    const result = await servicesController.getServicesBySubAccountIDId(Number(req.params.subAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const service = <ServicesModel>{
      subAccountID: req.body.subAccountID,
      serviceTypeID: req.body.serviceTypeID,
    };
    const result = await servicesController.create(service);
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
    const service = <ServicesModel>{
      ID: Number(req.params.ID),
      subAccountID: req.body.subAccountID,
      serviceTypeID: req.body.serviceTypeID,
    };
    const result = await servicesController.update(service, language);
    res.json(result);
  } catch (error) {
    console.log(error);

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
  app.get('/services/:isActive/:limit', getAll);
  app.get('/services-by-ID/:ID', getById);
  app.get('/services-by-subAccountID/:subAccountID', getBySubAccountId);
  app.post('/services', create);
  app.put('/services/:ID', update);
  app.put('/services/de-activate/:ID', deactivate);
  app.put('/services/activate/:ID', activate);
};

export default servicesRouter;
