import express, { Request, Response } from 'express';
import { CourierController } from './Controller';

const courierController = new CourierController();

const getShipments = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        //@ts-ignore
        const runnerID = req.employeeID;
        console.log(runnerID);
        
        const result = await courierController.getShipments(runnerID, Number(req.params.statusID), language);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const courierRouter = (app: express.Application) => {
    app.get('/shipments-courier/:statusID', getShipments);
};

export default courierRouter;