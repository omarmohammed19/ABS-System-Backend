import express, { Request, Response } from 'express';
import { NumberTypesController } from './Controller';
import { NumberTypesModel } from './Model';

const numberTypesController = new NumberTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await numberTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllDeActivated = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await numberTypesController.indexDeActivated(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await numberTypesController.getNumberTypesByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const NumberTypes = <NumberTypesModel>{
      enNumberType: req.body.enNumberType,
      arNumberType: req.body.arNumberType,
      Notes: req.body.Notes,
    };
    const result = await numberTypesController.create(NumberTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const NumberTypes = <NumberTypesModel>{
      ID: Number(req.params.ID),
      enNumberType: req.body.enNumberType,
      arNumberType: req.body.arNumberType,
      Notes: req.body.Notes,
    };
    const result = await numberTypesController.update(NumberTypes);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await numberTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await numberTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const NumberTypesRouter = (app: express.Application) => {
  app.get('/number-types', getAll);
  app.get('/number-types/de-activated', getAllDeActivated);
  app.get('/number-types/:ID', getById);
  app.post('/number-types', create);
  app.put('/number-types/:ID', update);
  app.put('/number-types/de-activate/:ID', deactivate);
  app.put('/number-types/activate/:ID', activate);
};

export default NumberTypesRouter;
