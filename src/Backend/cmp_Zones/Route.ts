import express, { Request, Response } from 'express';
import { ZonesController } from './Controller';
import { ZonesModel } from './Model';

const zonesController = new ZonesController();

const getAllActive = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await zonesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await zonesController.getAll(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await zonesController.getZoneByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getByZoneTypeID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await zonesController.getZoneByZoneTypeID(Number(req.params.zoneTypeID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const create = async (req: Request, res: Response) => {
    try {
        const zone = <ZonesModel>{
            zoneName: req.body.zoneName,
            zoneTypeID: req.body.zoneTypeID,
        };
        const result = await zonesController.create(zone);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const createZoneWithCities = async (req: Request, res: Response) => {
    try {
        const zone = <ZonesModel>{
            zoneName: req.body.zoneName,
            zoneTypeID: req.body.zoneTypeID,
        };
        const cities = req.body.cities;
        const result = await zonesController.createZoneWithCities(zone, cities);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const zone = <ZonesModel>{
            ID: Number(req.params.ID),
            zoneName: req.body.zoneName,
            zoneTypeID: req.body.zoneTypeID,
        };
        const result = await zonesController.update(zone, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const updateZoneWithCities = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const zone = <ZonesModel>{
            ID: Number(req.params.ID),
            zoneName: req.body.zoneName,
            zoneTypeID: req.body.zoneTypeID,
        };
        const cities = req.body.cities;
        const result = await zonesController.updateZoneWithCities(zone, cities, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await zonesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await zonesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const zonesRouter = (app: express.Application) => {
    app.get('/zones/:isActive', getAllActive);
    app.get('/zones', getAll);
    app.get('/zones-by-id/:ID', getById);
    app.get('/zones-by-zone-type/:zoneTypeID', getByZoneTypeID);
    app.post('/zones', create);
    app.post('/zones-with-cities', createZoneWithCities);
    app.put('/zones/:ID', update);
    app.put('/zones-with-cities/:ID', updateZoneWithCities);
    app.put('/zones/de-activate/:ID', deactivate);
    app.put('/zones/activate/:ID', activate);
}

export default zonesRouter;


