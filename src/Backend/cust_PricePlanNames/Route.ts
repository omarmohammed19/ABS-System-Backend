import express, { Request, Response } from 'express';
import { PricePlanNamesController } from './Controller';
import { PricePlanNamesModel } from './Model';

const pricePlanNamesController = new PricePlanNamesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pricePlanNamesController.index(language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getAllDeActivated = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await pricePlanNamesController.indexDeActivated(language);
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
    const result = await pricePlanNamesController.getPricePlanNameById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const pricePlanName = <PricePlanNamesModel>{
      enPricePlanName: req.body.enPricePlanName,
      arPricePlanName: req.body.arPricePlanName,
      pricePlanID: req.body.pricePlanID,
      numberOfShipments: req.body.numberOfShipments,
      collectionStart: req.body.collectionStart,
      collectionIncrement: req.body.collectionIncrement,
      collectionFees: req.body.collectionFees,
      basicPlan: req.body.basicPlan,
      defaultPlan: req.body.defaultPlan,
      Notes: req.body.Notes,
    };
    const result = await pricePlanNamesController.create(pricePlanName);
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
    const pricePlanName = <PricePlanNamesModel>{
      ID: Number(req.params.ID),
      enPricePlanName: req.body.enPricePlanName,
      arPricePlanName: req.body.arPricePlanName,
      pricePlanID: req.body.pricePlanID,
      numberOfShipments: req.body.numberOfShipments,
      collectionStart: req.body.collectionStart,
      collectionIncrement: req.body.collectionIncrement,
      collectionFees: req.body.collectionFees,
      basicPlan: req.body.basicPlan,
      defaultPlan: req.body.defaultPlan,
      Notes: req.body.Notes,
    };
    const result = await pricePlanNamesController.update(pricePlanName, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await pricePlanNamesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await pricePlanNamesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const pricePlanNamesRouter = (app: express.Application) => {
  app.get('/price-plan-names', getAll);
  app.get('/price-plan-names/de-activated', getAllDeActivated);
  app.get('/price-plan-names/:ID', getById);
  app.post('/price-plan-names', create);
  app.put('/price-plan-names/:ID', update);
  app.put('/price-plan-names/de-activate/:ID', deactivate);
  app.put('/price-plan-names/activate/:ID', activate);
};

export default pricePlanNamesRouter;
