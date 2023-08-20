import express, { Request, Response } from 'express';
import { StatusController } from './Controller';
import { StatusModel } from './Model';
import Sequalize from 'sequelize';
import { TransactionsModel } from '../ship_Transactions/Model';
import { sequelize } from '../../Config/database';

const statusController = new StatusController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await statusController.index(language, Number(req.params.isActive));
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
    const result = await statusController.getPrevStatusByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const status = <StatusModel>(<unknown>{
      enStatus: req.body.enStatus,
      arStatus: req.body.arStatus,
      custDisplayedStatusID: req.body.custDisplayedStatusID,
      requireReason: req.body.requireReason,
      Notes: req.body.Notes,
    });
    const result = await statusController.create(status);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:43 ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const status = <StatusModel>(<unknown>{
      ID: req.params.ID,
      enStatus: req.body.enStatus,
      arStatus: req.body.arStatus,
      custDisplayedStatusID: req.body.custDisplayedStatusID,
      requireReason: req.body.requireReason,
      Notes: req.body.Notes,
    });
    const result = await statusController.update(language, status);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};


const updateAwbStatus = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';

    const {
      AWB,
      transID,
      userID,
      statusID,
      runnerID,
      fromBranchID,
      toBranchID,
      currentBranchID,
      recipientID,
      recipientName,
      shipmentTypeID,

    } = req.body

    const result = await statusController.updateAWbStatus(AWB, statusID, userID, transID, shipmentTypeID, runnerID, toBranchID, fromBranchID, currentBranchID, recipientID, recipientName);
    res.json(result);


  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const {
      AWBs,
      statusID,
      userID,
      shipmentTypeID,
      runnerID,
      toBranchID,
      fromBranchID,
      currentBranchID,
      recipientID,
      recipientName,
    } = req.body;
    const result = await statusController.updateStatus(AWBs, statusID, userID, shipmentTypeID, runnerID, toBranchID, fromBranchID, currentBranchID, recipientID, recipientName)
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};



const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await statusController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await statusController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const statusRouter = (app: express.Application) => {
  app.get('/status/:isActive', getAll);
  app.get('/status-by-ID/:ID', getById);
  app.post('/status', create);
  app.put('/status/:ID', update);
  app.put('/status-awb', updateAwbStatus);
  app.put('/status-update', updateStatus);
  app.put('/status/deactivate/:ID', deactivate);
  app.put('/status/activate/:ID', activate);
};

export default statusRouter;
