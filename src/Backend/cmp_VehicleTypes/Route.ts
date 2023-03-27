import express, { Request, Response } from 'express';
import { VehicleTypesController } from './Controller';
import { VehicleTypesModel } from './Model';

const vehicleTypesController = new VehicleTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await vehicleTypesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await vehicleTypesController.getVehicleTypeById(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const vehicleType = <VehicleTypesModel>{
            enVehicleType: req.body.enVehicleType,
            arVehicleType: req.body.arVehicleType,
            Notes: req.body.Notes,
        };
        const result = await vehicleTypesController.create(vehicleType);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const vehicleType = <VehicleTypesModel>{
            ID: Number(req.params.ID),
            enVehicleType: req.body.enVehicleType,
            arVehicleType: req.body.arVehicleType,
            Notes: req.body.Notes,
        };
        const result = await vehicleTypesController.update(vehicleType);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await vehicleTypesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await vehicleTypesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const vehicleTypesRouter = (app: express.Application) => {
    app.get('/vehicle-types/:isActive', getAll);
    app.get('/vehicle-types-by-id/:ID', getById);
    app.post('/vehicle-types', create);
    app.put('/vehicle-types/:ID', update);
    app.put('/vehicle-types/deactivate/:ID', deactivate);
    app.put('/vehicle-types/activate/:ID', activate);
}

export default vehicleTypesRouter;