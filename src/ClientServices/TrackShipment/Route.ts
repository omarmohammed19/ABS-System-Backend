import express, { Request, Response } from 'express';
import { TrackShipmentController } from './Controller';
import Sequalize from 'sequelize';

const trackShipmentController = new TrackShipmentController();

const getStatusByAWB = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const AWB = req.params.AWB;
        const result = await trackShipmentController.getStatusByAWB(language, isActive, AWB);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const trackShipmentRouter = (app: express.Application) => {
    app.get('/track-shipment/:AWB/:isActive', getStatusByAWB);
};
export default trackShipmentRouter;