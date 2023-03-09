import express, { Request, Response } from 'express';
import { ContactLogTypesController } from './Controller';
import { ContactLogTypesModel } from './Model';
import verifyJWT from '../../Middlewares/verifyJWT';

const contactLogTypesController = new ContactLogTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactLogTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactLogTypesController.getContactLogTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const contactLogType = <ContactLogTypesModel>{
      enContactLogType: req.body.enContactLogType,
      arContactLogType: req.body.arContactLogType,
      Notes: req.body.Notes,
    };
    const result = await contactLogTypesController.create(contactLogType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const contactLogType = <ContactLogTypesModel>{
      ID: Number(req.params.ID),
      enContactLogType: req.body.enContactLogType,
      arContactLogType: req.body.arContactLogType,
      Notes: req.body.Notes,
    };
    const result = await contactLogTypesController.update(contactLogType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await contactLogTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await contactLogTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const contactLogTypesRouter = (app: express.Application) => {
  app.get('/contactLogTypes', verifyJWT, getAll);
  app.get('/contactLogTypes/:ID', verifyJWT, getById);
  app.post('/contactLogTypes', verifyJWT, create);
  app.put('/contactLogTypes/:ID', verifyJWT, update);
  app.put('/contactLogTypes/deactivate/:ID', verifyJWT, deactivate);
  app.put('/contactLogTypes/activate/:ID', verifyJWT, activate);
};

export default contactLogTypesRouter;
