import express, { Request, Response } from 'express';
import { LegalPaperTypesController } from './Controller';
import { LegalPaperTypesModel } from './Model';

const legalPaperTypesController = new LegalPaperTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await legalPaperTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await legalPaperTypesController.getLegalPaperTypesByID(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const LegalPaperTypes = <LegalPaperTypesModel>{
      enLegalPaperType: req.body.enLegalPaperType,
      arLegalPaperType: req.body.arLegalPaperType,
      Notes: req.body.Notes,
    };
    const result = await legalPaperTypesController.create(LegalPaperTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const LegalPaperTypes = <LegalPaperTypesModel>{
      ID: Number(req.params.ID),
      enLegalPaperType: req.body.enLegalPaperType,
      arLegalPaperType: req.body.arLegalPaperType,
      Notes: req.body.Notes,
    };
    const result = await legalPaperTypesController.update(LegalPaperTypes);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await legalPaperTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await legalPaperTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const LegalPaperTypesRouter = (app: express.Application) => {
  app.get('/legal-paper-types', getAll);
  app.get('/legal-paper-types/:ID', getById);
  app.post('/legal-paper-types', create);
  app.put('/legal-paper-types/:ID', update);
  app.put('/legal-paper-types/deactivate/:ID', deactivate);
  app.put('/legal-paper-types/activate/:ID', activate);
};

export default LegalPaperTypesRouter;
