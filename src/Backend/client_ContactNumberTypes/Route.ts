import express, { Request, Response } from 'express';
import { ContactNumberTypesController } from './Controller';
import { ContactNumberTypesModel } from './Model';

const contactNumberTypesController = new ContactNumberTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactNumberTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await contactNumberTypesController.getContactNumberTypeByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const contactNumberTypes = <ContactNumberTypesModel>{
      enContactNumberType: req.body.enContactNumberType,
      arContactNumberType: req.body.arContactNumberType,
      Notes: req.body.Notes,
    };
    const result = await contactNumberTypesController.create(contactNumberTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const contactNumberTypes = <ContactNumberTypesModel>{
      ID: Number(req.params.ID),
      enContactNumberType: req.body.enContactNumberType,
      arContactNumberType: req.body.arContactNumberType,
      Notes: req.body.Notes,
    };
    const result = await contactNumberTypesController.update(contactNumberTypes);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await contactNumberTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await contactNumberTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const ContactNumberTypesRouter = (app: express.Application) => {
  app.get('/contact-number-types', getAll);
  app.get('/contact-number-types/:ID', getById);
  app.post('/contact-number-types', create);
  app.put('/contact-number-types/:ID', update);
  app.put('/contact-number-types/deactivate/:ID', deactivate);
  app.put('/contact-number-types/activate/:ID', activate);
};

export default ContactNumberTypesRouter;
