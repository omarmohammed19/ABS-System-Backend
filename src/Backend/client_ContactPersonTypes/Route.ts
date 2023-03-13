import express, { Request, Response } from 'express';
import { ContactPersonTypesController } from './Controller';
import { ContactPersonTypesModel } from './Model';

const contactPersonTypesController = new ContactPersonTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactPersonTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactPersonTypesController.getContactPersonTypeByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const contactPersonTypes = <ContactPersonTypesModel>{
      enContactPersonType: req.body.enContactPersonType,
      arContactPersonType: req.body.arContactPersonType,
      Notes: req.body.Notes,
    };
    const result = await contactPersonTypesController.create(contactPersonTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const contactPersonTypes = <ContactPersonTypesModel>{
      ID: Number(req.params.ID),
      enContactPersonType: req.body.enContactPersonType,
      arContactPersonType: req.body.arContactPersonType,
      Notes: req.body.Notes,
    };
    const result = await contactPersonTypesController.update(contactPersonTypes);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await contactPersonTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await contactPersonTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const ContactPersonTypesRouter = (app: express.Application) => {
  app.get('/contact-person-types', getAll);
  app.get('/contact-person-types/:ID', getById);
  app.post('/contact-person-types', create);
  app.put('/contact-person-types/:ID', update);
  app.put('/contact-person-types/deactivate/:ID', deactivate);
  app.put('/contact-person-types/activate/:ID', activate);
};

export default ContactPersonTypesRouter;
