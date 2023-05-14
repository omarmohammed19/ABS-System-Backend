import express, { Request, Response } from 'express';
import { NearestBranchController } from './Controller';
import { NearestBranchModel } from './Model';

const nearestBranchController = new NearestBranchController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await nearestBranchController.index(language, Number(req.params.isActive), Number(req.params.limit));
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
    const result = await nearestBranchController.getNearestBranchById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const result = await nearestBranchController.getNearestBranchBySubAccountID(subAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const nearestBranch = <NearestBranchModel>{
      branchID: req.body.branchID,
    };
    const result = await nearestBranchController.create(nearestBranch);
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
    const nearestBranch = <NearestBranchModel>{
      ID: Number(req.params.ID),
      branchID: req.body.branchID,
    };
    const result = await nearestBranchController.update(nearestBranch, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await nearestBranchController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await nearestBranchController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const nearestBranchRouter = (app: express.Application) => {
  app.get('/nearest-branch/:isActive/:limit', getAll);
  app.get('/nearest-branch-by-ID/:ID', getById);
  app.get('/nearest-branch-by-sub-account-ID', getBySubAccountID);
  app.post('/nearest-branch', create);
  app.put('/nearest-branch/:ID', update);
  app.put('/nearest-branch/de-activate/:ID', deactivate);
  app.put('/nearest-branch/activate/:ID', activate);
};

export default nearestBranchRouter;
