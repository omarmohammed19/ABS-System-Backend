import express, { Request, Response } from 'express';
import { ContactPersonsController } from './Controller';
import { ContactPersonsModel } from './Model';

const contactPersonsController = new ContactPersonsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactPersonsController.index(language, Number(req.params.limit), Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getByID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactPersonsController.getContactPersonsById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const contactPersons = <ContactPersonsModel>{
      ID: Number(req.params.ID),
      subAccountID: req.body.subAccountID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contactPersonTypeID: req.body.contactPersonTypeID,
      addressID: req.body.addressID,
    };
    const result = await contactPersonsController.update(contactPersons, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const contactPerson = <ContactPersonsModel>{
      subAccountID: req.body.subAccountID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contactPersonTypeID: req.body.contactPersonTypeID,
      addressID: req.body.addressID,
    };
    const result = await contactPersonsController.create(contactPerson);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await contactPersonsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await contactPersonsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const contactPersonRouter = (app: express.Application) => {
  app.get('/contact-person/:isActive/:limit', getAll);
  app.get('/contact-person-by-ID/:ID', getByID);
  app.post('/contact-person', create);
  app.put('/contact-person/:ID', update);
  app.put('/contact-person/de-activate/:ID', deactivate);
  app.put('/contact-person/activate/:ID', activate);
};

export default contactPersonRouter;
