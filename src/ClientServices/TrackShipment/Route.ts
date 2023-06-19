import { subAccount } from './../../../src2/Models2/subAccount';
import express, { Request, Response } from 'express';
import { TrackShipmentController } from './Controller';
import Sequalize from 'sequelize';

const trackShipmentController = new TrackShipmentController();

const getStatusByAWB = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const AWB = req.params.AWB;
    const result = await trackShipmentController.getStatusByAWB(language, subAccountID, AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllStatusesByAWB = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const AWB = req.params.AWB;
    const result = await trackShipmentController.getAllStatusesByAWB(language, subAccountID, AWB);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const checkAWBExistence = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const AWB = req.params.AWB;
    const result = await trackShipmentController.checkAWBExistence(AWB, subAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const trackShipmentRouter = (app: express.Application) => {
  app.get('/track-shipment/:AWB', getStatusByAWB);
  app.get('/check-awb/:AWB', checkAWBExistence);
  app.get('/track-shipment/all/:AWB', getAllStatusesByAWB);
};
export default trackShipmentRouter;
