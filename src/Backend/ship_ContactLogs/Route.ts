import express, { Request, Response } from 'express';
import { ContactLogsController } from './Controller';
import { ContactLogsModel } from './Model';
import Sequalize from 'sequelize';

const contactLogsController = new ContactLogsController();

const currentDate = Sequalize.literal('GETDATE()');

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactLogsController.index(language, Number(req.params.isActive));
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
    const result = await contactLogsController.getContactLogsByAWB(String(req.params.AWB), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const contactLogs = <ContactLogsModel>(<unknown>{
      AWB: req.body.AWB,
      userID: req.body.userID,
      contactTypeID: req.body.contactTypeID,
      actionDate: currentDate,
      smsTemplateID: req.body.smsTemplateID,
      phoneNumber: req.body.phoneNumber,
    });
    const result = await contactLogsController.create(contactLogs);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const contactLogs = <ContactLogsModel>(<unknown>{
      AWB: req.params.AWB,
      userID: req.body.userID,
      contactTypeID: req.body.contactTypeID,
      actionDate: currentDate,
      smsTemplateID: req.body.smsTemplateID,
      phoneNumber: req.body.phoneNumber,
    });
    const result = await contactLogsController.update(language, contactLogs);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:66 ~ update ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await contactLogsController.deactivate(req.params.AWB);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await contactLogsController.activate(req.params.AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const contactLogsRouter = (app: express.Application) => {
  app.get('/contact-logs/:isActive', getAll);
  app.get('/contact-logs-by-AWB/:AWB', getById);
  app.post('/contact-logs', create);
  app.put('/contact-logs/:AWB', update);
  app.put('/contact-logs/deactivate/:AWB', deactivate);
  app.put('/contact-logs/activate/:AWB', activate);
};

export default contactLogsRouter;
