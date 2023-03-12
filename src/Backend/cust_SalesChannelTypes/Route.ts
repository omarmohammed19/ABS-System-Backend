import express, { Request, Response } from 'express';
import { SalesChannelTypesController } from './Controller';
import { SalesChannelTypesModel } from './Model';

const salesChannelTypesController = new SalesChannelTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await salesChannelTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await salesChannelTypesController.getSalesChannelTypesById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const salesChannelTypes = <SalesChannelTypesModel>{
      enSalesChannelType: req.body.enSalesChannelType,
      arSalesChannelType: req.body.arSalesChannelType,
      Notes: req.body.Notes
    };
    const result = await salesChannelTypesController.create(salesChannelTypes);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const salesChannelTypes = <SalesChannelTypesModel>{
      ID: Number(req.params.ID),
      enSalesChannelType: req.body.enSalesChannelType,
      arSalesChannelType: req.body.arSalesChannelType,
      Notes: req.body.Notes
    };
    const result = await salesChannelTypesController.update(salesChannelTypes);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await salesChannelTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await salesChannelTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const salesChannelTypesRouter = (app: express.Application) => {
  app.get('/salesChannelTypes', getAll);
  app.get('/salesChannelTypes/:ID', getById);
  app.post('/salesChannelTypes', create);
  app.put('/salesChannelTypes/:ID', update);
  app.put('/salesChannelTypes/deactivate/:ID', deactivate);
  app.put('/salesChannelTypes/activate/:ID', activate);
};

export default salesChannelTypesRouter;
