import { subAccount } from './../../../src2/Models2/subAccount';
import express, { Request, Response } from 'express';
import { TrackShipmentController } from './Controller';
import Sequalize from 'sequelize';

const trackShipmentController = new TrackShipmentController();

const getStatusByAWB = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const subAccountID = String(req.params.subAccountID);
    const AWB = req.params.AWB;
    const result = await trackShipmentController.getStatusByAWB(language, subAccountID, AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const checkAWBExistence = async (req: Request, res: Response) => {
  try {
    const AWB = req.params.AWB;
    const subAccountID = Number(req.params.subAccountID);
    const result = await trackShipmentController.checkAWBExistence(AWB, subAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const trackShipmentRouter = (app: express.Application) => {
  app.get('/track-shipment/:subAccountID/:AWB', getStatusByAWB);
  app.get('/check-awb/:AWB/:subAccountID', checkAWBExistence);
};
export default trackShipmentRouter;
