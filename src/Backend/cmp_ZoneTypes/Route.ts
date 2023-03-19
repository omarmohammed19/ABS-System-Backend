import express, { Request, Response } from 'express';
import { ZoneTypesController } from './Controller';
import { ZoneTypesModel } from './Model';

const zoneTypesController = new ZoneTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await zoneTypesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await zoneTypesController.getZoneTypeByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const create = async (req: Request, res: Response) => {
    try {
        const zoneType = <ZoneTypesModel>{
            enZoneType: req.body.enZoneType,
            arZoneType: req.body.arZoneType,
            Notes: req.body.Notes,
        };
        const result = await zoneTypesController.create(zoneType);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const zoneType = <ZoneTypesModel>{
            ID: Number(req.params.ID),
            enZoneType: req.body.enZoneType,
            arZoneType: req.body.arZoneType,
            Notes: req.body.Notes,
        };
        const result = await zoneTypesController.update(zoneType);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await zoneTypesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await zoneTypesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const zonesTypesRouter = (app: express.Application) => {
    app.get('/zones-types/:isActive', getAll);
    app.get('/zones-types-by-id/:ID', getById);
    app.post('/zones-types', create);
    app.put('/zones-types/:ID', update);
    app.put('/zones-types/de-activate/:ID', deactivate);
    app.put('/zones-types/activate/:ID', activate);
}

export default zonesTypesRouter;

