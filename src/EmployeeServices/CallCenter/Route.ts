import express, { Request, Response } from 'express';
import { CallCenterController } from './Controller';

const callCenterController = new CallCenterController();

const updateShipmentDetails = async (req: Request, res: Response) => {
    //@ts-ignore
    const userID = req.userID;
    const { AWB, callPlanID, callResultID, streetName, aptNumber, floorNumber, buildNumber, cityID, postalCode, contactNumber, appointment } = req.body;
    
    try {
        const result = await callCenterController.updateShipmentDetails(AWB, callPlanID, callResultID, userID, streetName, aptNumber, floorNumber, buildNumber, cityID, postalCode, contactNumber, appointment);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
}

const callCenterRouter = (app: express.Application) => {
    app.put('/call-center/update', updateShipmentDetails);
};

export default callCenterRouter;