import express, { Request, Response } from 'express';
import { LegalPapersController } from './Controller';
import { LegalPapersModel } from './Model';

const legalPapersController = new LegalPapersController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await legalPapersController.index(language, Number(req.params.limit), Number(req.params.isActive));
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
    const result = await legalPapersController.getLegalPaperById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.ID);
    const legalPaperImage = String(req.body.legalPaperImage);
    const result = await legalPapersController.update(legalPaperImage, ID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const legal = <LegalPapersModel>{
      mainAccountID: req.body.mainAccountID,
      legalPaperTypeID: req.body.legalPaperTypeID,
      legalPaperImage: req.body.legalPaperImage,
    };
    const result = await legalPapersController.create(legal);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await legalPapersController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await legalPapersController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const legalPaperRouter = (app: express.Application) => {
  app.get('/legal-paper/:isActive/:limit', getAll);
  app.get('/legal-paper-by-ID/:ID', getByID);
  app.post('/legal-paper', create);
  app.put('/legal-paper/:ID', update);
  app.put('/legal-paper/de-activate/:ID', deactivate);
  app.put('/legal-paper/activate/:ID', activate);
};

export default legalPaperRouter;
