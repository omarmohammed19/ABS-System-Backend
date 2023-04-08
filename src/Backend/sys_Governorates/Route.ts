import express, { Request, Response } from 'express';
import { GovernoratesController } from './Controller';
import { GovernoratesModel } from './Model';

const governoratesController = new GovernoratesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const result = await governoratesController.index(language, isActive);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await governoratesController.getGovernorateByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getByCountryID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const countryID = Number(req.params.countryID);
        const result = await governoratesController.getGovernoratesByCountryID(language, isActive, countryID);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const create = async (req: Request, res: Response) => {
    try {
        const governorate = <GovernoratesModel>{
            enGovernorateName: req.body.enGovernorateName,
            arGovernorateName: req.body.arGovernorateName,
            countryID: req.body.countryID,
            Notes: req.body.Notes,
        };
        const result = await governoratesController.create(governorate);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const governorate = <GovernoratesModel>{
            ID: Number(req.params.ID),
            enGovernorateName: req.body.enGovernorateName,
            arGovernorateName: req.body.arGovernorateName,
            countryID: req.body.countryID,
            Notes: req.body.Notes,
        };
        const result = await governoratesController.update(governorate, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await governoratesController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await governoratesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const governoratesRouter = (app: express.Application) => {
    app.get('/governorates/:isActive', getAll);
    app.get('/governorates-by-id/:ID', getById);
    app.post('/governorates', create);
    app.put('/governorates/:ID', update);
    app.put('/governorates/de-activate/:ID', deActivate);
    app.put('/governorates/activate/:ID', activate);
    app.get('/governorates-by-country-id/:countryID/:isActive', getByCountryID);
}

export default governoratesRouter;