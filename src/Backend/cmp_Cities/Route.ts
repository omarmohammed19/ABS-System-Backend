import express, { Request, Response } from 'express';
import { CitiesController } from './Controller';
import { CitiesModel } from './Model';

const citiesController = new CitiesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const result = await citiesController.index(language, isActive);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await citiesController.getCityByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getByGovernorateID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const governorateID = Number(req.params.governorateID);
        const result = await citiesController.getCitiesByGovernorateID(language, isActive, governorateID);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getByZoneID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const zoneID = Number(req.params.zoneID);
        const result = await citiesController.getCitiesByZoneID(language, isActive, zoneID);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const city = <CitiesModel>{
            enCityName: req.body.enCityName,
            arCityName: req.body.arCityName,
            governorateID: req.body.governorateID,
            zoneID: req.body.zoneID,
            Notes: req.body.Notes,
        };
        const result = await citiesController.create(city);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const city = <CitiesModel>{
            ID: Number(req.params.ID),
            enCityName: req.body.enCityName,
            arCityName: req.body.arCityName,
            governorateID: req.body.governorateID,
            zoneID: req.body.zoneID,
            Notes: req.body.Notes,
        };
        const result = await citiesController.update(city, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await citiesController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await citiesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const citiesRouter = (app: express.Application) => {
    app.get('/cities/:isActive', getAll);
    app.get('/cities-by-id/:ID', getById);
    app.post('/cities', create);
    app.put('/cities/:ID', update);
    app.put('/cities/de-activate/:ID', deActivate);
    app.put('/cities/activate/:ID', activate);
    app.get('/cities-by-governorate-id/:governorateID/:isActive', getByGovernorateID);
    app.get('/cities-by-zone-id/:zoneID/:isActive', getByZoneID);
}

export default citiesRouter;