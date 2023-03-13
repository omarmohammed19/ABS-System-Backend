import express, { Request, Response } from 'express';
import { RecipientTypesController } from './Controller';
import { RecipientTypesModel } from './Model';

const recipientTypesController = new RecipientTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await recipientTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await recipientTypesController.getRecipientTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const recipientType = <RecipientTypesModel>{
      enRecipientType: req.body.enRecipientType,
      arRecipientType: req.body.arRecipientType,
      Notes: req.body.Notes,
    };
    const result = await recipientTypesController.create(recipientType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const recipientType = <RecipientTypesModel>{
      ID: Number(req.params.ID),
      enRecipientType: req.body.enRecipientType,
      arRecipientType: req.body.arRecipientType,
      Notes: req.body.Notes,
    };
    const result = await recipientTypesController.update(recipientType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await recipientTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await recipientTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const recipientTypesRouter = (app: express.Application) => {
  app.get('/recipient-types', getAll);
  app.get('/recipient-types/:ID', getById);
  app.post('/recipient-types', create);
  app.put('/recipient-types/:ID', update);
  app.put('/recipient-types/de-activate/:ID', deactivate);
  app.put('/recipient-types/activate/:ID', activate);
};

export default recipientTypesRouter;
