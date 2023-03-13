import express, { Request, Response } from 'express';
import { AddressTypesController } from './Controller';
import { AddressTypesModel } from './Model';

const addressTypesController = new AddressTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addressTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllDeActivated = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addressTypesController.indexDeActivated(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addressTypesController.getAddressTypeByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addressTypes = <AddressTypesModel>{
      enAddressType: req.body.enAddressType,
      arAddressType: req.body.arAddressType,
      Notes: req.body.Notes,
    };
    const result = await addressTypesController.create(addressTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const addressTypes = <AddressTypesModel>{
      ID: Number(req.params.ID),
      enAddressType: req.body.enAddressType,
      arAddressType: req.body.arAddressType,
      Notes: req.body.Notes,
    };
    const result = await addressTypesController.update(addressTypes);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await addressTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await addressTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const AddressTypesRouter = (app: express.Application) => {
  app.get('/address-types', getAll);
  app.get('/address-types/de-activated', getAllDeActivated);
  app.get('/address-types/:ID', getById);
  app.post('/address-types', create);
  app.put('/address-types/:ID', update);
  app.put('/address-types/de-activate/:ID', deactivate);
  app.put('/address-types/activate/:ID', activate);
};

export default AddressTypesRouter;
