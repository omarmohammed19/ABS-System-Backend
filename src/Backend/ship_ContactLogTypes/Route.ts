import express, { Request, Response } from 'express';
import { ContactLogTypesController } from './Controller';
import { ContactLogTypesModel } from './Model';

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
  app.get('/contact-log-types', getAll);
  app.get('/contact-log-types/:ID', getById);
  app.post('/contact-log-types', create);
  app.put('/contact-log-types/:ID', update);
  app.put('/contact-log-types/de-activate/:ID', deactivate);
  app.put('/contact-log-types/activate/:ID', activate);
};

export default contactLogTypesRouter;
