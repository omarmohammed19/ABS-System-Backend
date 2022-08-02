import { deliveryLocationsController } from './../Controllers/deliveryLocationsController';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const makeDeliveryLocationsRoute = new deliveryLocationsController();

const getDeliveryLocations = async (_req: Request, res: Response) => {
    try {
        const result = await makeDeliveryLocationsRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDeliveryLocationsById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeDeliveryLocationsRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addDeliveryLocations = async (req: Request, res: Response) => {
    try {
        const result = await makeDeliveryLocationsRoute.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updatedeliveryLocations = async (req: Request, res: Response) => {
    try {
        const result = await makeDeliveryLocationsRoute.update(
            {
                ID: parseInt(req.params.id),
                locationName: req.body.locationName,
                addressID: req.body.addressID,
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }

}

const deletedeliveryLocations = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeDeliveryLocationsRoute.delete(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deliverylocations_Route = (app: express.Application) => {
    app.get('/deliverylocations', getDeliveryLocations);
    app.get('/deliverylocations/:id', getDeliveryLocationsById);
    app.post('/deliverylocations', addDeliveryLocations);
    app.put('/deliverylocations/:id', updatedeliveryLocations);
    app.delete('/deliverylocations/:id', deletedeliveryLocations);
}


export default deliverylocations_Route;
