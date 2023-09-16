import express, { Request, Response } from 'express';
import { VerificationTypesController } from './Controller';
import { VerificationTypesModel } from './Model';

const verificationTypesController = new VerificationTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await verificationTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await verificationTypesController.getVerificationTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const verificationType = <VerificationTypesModel>{
      enVerificationType: req.body.enVerificationType,
      arVerificationType: req.body.arVerificationType,
      Notes: req.body.Notes,
    };
    const result = await verificationTypesController.create(verificationType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const verificationType = <VerificationTypesModel>{
      ID: Number(req.params.ID),
      enVerificationType: req.body.enVerificationType,
      arVerificationType: req.body.arVerificationType,
      Notes: req.body.Notes,
    };
    const result = await verificationTypesController.update(verificationType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await verificationTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await verificationTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const verificationTypesRouter = (app: express.Application) => {
  app.get('/verification-types', getAll);
  app.get('/verification-types/:ID', getById);
  app.post('/verification-types', create);
  app.put('/verification-types/:ID', update);
  app.put('/verification-types/de-activate/:ID', deactivate);
  app.put('/verification-types/activate/:ID', activate);
};

export default verificationTypesRouter;
