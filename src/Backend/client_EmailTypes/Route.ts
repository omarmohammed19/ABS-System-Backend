import express, { Request, Response } from 'express';
import { EmailTypesController } from './Controller';
import { EmailTypesModel } from './Model';

const emailTypesController = new EmailTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await emailTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await emailTypesController.getEmailTypesByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const EmailTypes = <EmailTypesModel>{
      enEmailType: req.body.enEmailType,
      arEmailType: req.body.arEmailType,
      Notes: req.body.Notes,
    };
    const result = await emailTypesController.create(EmailTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const EmailTypes = <EmailTypesModel>{
      ID: Number(req.params.ID),
      enEmailType: req.body.enEmailType,
      arEmailType: req.body.arEmailType,
      Notes: req.body.Notes,
    };
    const result = await emailTypesController.update(EmailTypes);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await emailTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await emailTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const EmailTypesRouter = (app: express.Application) => {
  app.get('/email-types', getAll);
  app.get('/email-types/:ID', getById);
  app.post('/email-types', create);
  app.put('/email-types/:ID', update);
  app.put('/email-types/deactivate/:ID', deactivate);
  app.put('/email-types/activate/:ID', activate);
};

export default EmailTypesRouter;
