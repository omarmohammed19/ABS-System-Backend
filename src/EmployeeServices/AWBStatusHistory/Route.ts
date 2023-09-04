import express, { Request, Response } from 'express';
import { AWBStatusHistoryController } from './Controller';

const awbStstusHistoryController = new AWBStatusHistoryController();

const getByAWB = async (req: Request, res: Response) => {
  const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
  try {
    const result = await awbStstusHistoryController.getAWBStatusHistory(String(req.params.AWB), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const awbStatusHistoryRouter = (app: express.Application) => {
  app.get('/awb-status-history/:AWB', getByAWB);
};

export default awbStatusHistoryRouter;
