import express, { Request, Response } from 'express';
import { ContactNumbersController } from './Controller';
import { ContactNumbersModel } from './Model';

const contactNumbersController = new ContactNumbersController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactNumbersController.index(language, Number(req.params.limit), Number(req.params.isActive));
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
    const result = await contactNumbersController.getContactNumbersById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const service = <ContactNumbersModel>{
      contactNumber: req.body.contactNumber,
      cneeContactPersonID: req.body.cneeContactPersonID,
      numberTypeID: req.body.numberTypeID,
    };
    const result = await contactNumbersController.create(service);
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
    const service = <ContactNumbersModel>{
      ID: Number(req.params.ID),
      contactNumber: req.body.contactNumber,
      cneeContactPersonID: req.body.cneeContactPersonID,
      numberTypeID: req.body.numberTypeID,
    };
    const result = await contactNumbersController.update(service, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await contactNumbersController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await contactNumbersController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const contactNumbersRouter = (app: express.Application) => {
  app.get('/contact-numbers/:isActive/:limit', getAll);
  app.get('/contact-numbers-by-id/:ID', getById);
  app.post('/contact-numbers', create);
  app.put('/contact-numbers/:ID', update);
  app.put('/contact-numbers/de-activate/:ID', deactivate);
  app.put('/contact-numbers/activate/:ID', activate);
};

export default contactNumbersRouter;
