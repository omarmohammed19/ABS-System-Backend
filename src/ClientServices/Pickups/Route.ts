import express, { Request, Response } from 'express';
import { PickupsController } from './Controller';

const pickupsController = new PickupsController();

const getHistoryPickups = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const subAccountID = Number(req.params.subAccountID);
        const limit = Number(req.params.limit);
        const result = await pickupsController.getHistoryPickups(language, isActive, subAccountID, limit);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getUpcomingPickups = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const subAccountID = Number(req.params.subAccountID);
        const limit = Number(req.params.limit);
        const result = await pickupsController.getUpcomingPickups(language, isActive, subAccountID, limit);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const pickupServicesRouter = (app: express.Application) => {
    app.get('/history-pickups/:subAccountID/:isActive/:limit?', getHistoryPickups);
    app.get('/upcoming-pickups/:subAccountID/:isActive/:limit?', getUpcomingPickups);
};
export default pickupServicesRouter;