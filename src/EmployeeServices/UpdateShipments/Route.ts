import express, { Request, Response } from 'express';
import { UpdateShipmentsController } from './Controller';

const updateShipmentsController = new UpdateShipmentsController();


const checkShipments = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const { AWBs, newStatusID } = req.body;

        const result = await updateShipmentsController.checkShipments(AWBs, language, newStatusID);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};



const UpdateShipmentsRouter = (app: express.Application) => {
    app.post('/check-shipments', checkShipments);

};

export default UpdateShipmentsRouter;