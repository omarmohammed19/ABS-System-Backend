import express, { Request, Response } from 'express';
import { ExtraInfoController } from './Controller';
import { ExtraInfoModel } from './Model';

const extraInfoController = new ExtraInfoController();

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await extraInfoController.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const result = await extraInfoController.getExtraInfoById(req.params.AWB);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const extraInfo = <ExtraInfoModel>{
      AWB: req.body.AWB,
      Data1: req.body.Data1,
      Data2: req.body.Data2,
      Data3: req.body.Data3,
      Data4: req.body.Data4,
      Data5: req.body.Data5,
      Data6: req.body.Data6,
      Data7: req.body.Data7,
      Data8: req.body.Data8,
      Data9: req.body.Data9,
      Data10: req.body.Data10,
      Notes: req.body.Notes,
    };
    const result = await extraInfoController.create(extraInfo);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const extraInfo = <ExtraInfoModel>{
      ID: Number(req.params.ID),
      Data1: req.body.Data1,
      Data2: req.body.Data2,
      Data3: req.body.Data3,
      Data4: req.body.Data4,
      Data5: req.body.Data5,
      Data6: req.body.Data6,
      Data7: req.body.Data7,
      Data8: req.body.Data8,
      Data9: req.body.Data9,
      Data10: req.body.Data10,
      Notes: req.body.Notes,
    };
    const result = await extraInfoController.update(extraInfo);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await extraInfoController.deactivate(req.params.AWB);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await extraInfoController.activate(req.params.AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const extraInfoRouter = (app: express.Application) => {
  app.get('/extra-Info', getAll);
  app.get('/extra-Info/:AWB', getById);
  app.post('/extra-Info', create);
  app.put('/extra-Info/:AWB', update);
  app.put('/extra-Info/deactivate/:AWB', deactivate);
  app.put('/extra-Info/activate/:AWB', activate);
};

export default extraInfoRouter;
