import express, { Request, Response } from 'express';
import { HomeController } from './Controller';

const homeController = new HomeController();

const getStatusCountOfShipmentsBySubAccountID = async (req: Request, res: Response) => {
  try {
    const subAccountID = Number(req.params.subAccountID);
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const result = await homeController.getStatusCountOfShipmentsBySubAccountID(subAccountID, fromDate, toDate);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getStatusCountOfShipmentsByMainAccountID = async (req: Request, res: Response) => {
  try {
    const mainAccount = Number(req.params.mainAccount);
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const result = await homeController.getStatusCountOfShipmentsByMainAccountID(mainAccount, fromDate, toDate);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getPaid_NotPaidShipmentsCountBySubAccountID = async (req: Request, res: Response) => {
  try {
    const subAccountID = Number(req.params.subAccountID);
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const result = await homeController.getPaid_NotPaidShipmentsCountBySubAccountID(subAccountID, fromDate, toDate);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getPaid_NotPaidShipmentsCountByByMainAccountID = async (req: Request, res: Response) => {
  try {
    const mainAccount = Number(req.params.mainAccount);
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const result = await homeController.getPaid_NotPaidShipmentsCountByByMainAccountID(mainAccount, fromDate, toDate);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const HomeServicesRouter = (app: express.Application) => {
  app.post('/status-count-by-subAccountID/:subAccountID/', getStatusCountOfShipmentsBySubAccountID);
  app.post('/status-count-by-mainAccount/:mainAccount/', getStatusCountOfShipmentsByMainAccountID);
  app.post('/paid-not-paid-count-by-subAccountID/:subAccountID/', getPaid_NotPaidShipmentsCountBySubAccountID);
  app.post('/paid-not-paid-count-by-mainAccount/:mainAccount/', getPaid_NotPaidShipmentsCountByByMainAccountID);
};
export default HomeServicesRouter;
