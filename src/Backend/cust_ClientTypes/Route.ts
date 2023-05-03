import express, { Request, Response } from 'express';
import { ClientTypesController } from './Controller';
import { ClientTypesModel } from './Model';

const clientTypesController = new ClientTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await clientTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllDeActivated = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await clientTypesController.indexDeActivated(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await clientTypesController.getClientTypesByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const ClientType = <ClientTypesModel>{
      enClientType: req.body.enClientType,
      arClientType: req.body.arClientType,
      Notes: req.body.Notes,
    };
    const result = await clientTypesController.create(ClientType);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const ClientType = <ClientTypesModel>{
      ID: Number(req.params.ID),
      enClientType: req.body.enClientType,
      arClientType: req.body.arClientType,
      Notes: req.body.Notes,
    };
    const result = await clientTypesController.update(ClientType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await clientTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await clientTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const ClientTypesRouter = (app: express.Application) => {
  app.get('/client-types', getAll);
  app.get('/client-types/de-activated', getAllDeActivated);
  app.get('/client-types/:ID', getById);
  app.post('/client-types', create);
  app.put('/client-types/:ID', update);
  app.put('/client-types/de-activate/:ID', deactivate);
  app.put('/client-types/activate/:ID', activate);
};

export default ClientTypesRouter;
