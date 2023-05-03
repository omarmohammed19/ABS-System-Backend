import express, { Request, Response } from 'express';
import { EmailsController } from './Controller';
import { EmailsModel } from './Model';

const emailsController = new EmailsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await emailsController.index(language, Number(req.params.limit), Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getByAWB = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await emailsController.getEmailsByAWB(String(req.params.AWB), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const AWB = req.params.AWB;
    const Email = String(req.body.Email);
    const result = await emailsController.update(Email, AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const email = <EmailsModel>{
      emailTypeID: req.body.emailTypeID,
      contactPersonID: req.body.contactPersonID,
      email: req.body.email,
    };
    const result = await emailsController.create(email);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await emailsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await emailsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const emailRouter = (app: express.Application) => {
  app.get('/email/:isActive/:limit', getAll);
  app.get('/email-by-awb/:AWB', getByAWB);
  app.post('/email', create);
  app.put('/email/:AWB', update);
  app.put('/email/de-activate/:ID', deactivate);
  app.put('/email/activate/:ID', activate);
};

export default emailRouter;
