import express, { Request, Response } from 'express';
import { CountriesController } from './Controller';
import { CountriesModel } from './Model';

const countriescontroller = new CountriesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await countriescontroller.index(Number(req.params.isActive), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await countriescontroller.getCountryByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const country = <CountriesModel>{
            enCountryName: req.body.enCountryName,
            arCountryName: req.body.arCountryName,
            Notes: req.body.Notes,
        };
        const result = await countriescontroller.create(country);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const country = <CountriesModel>{
            ID: Number(req.params.ID),
            enCountryName: req.body.enCountryName,
            arCountryName: req.body.arCountryName,
            Notes: req.body.Notes,
        };
        const result = await countriescontroller.update(country);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await countriescontroller.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await countriescontroller.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const CountriesRouter = (app: express.Application) => {
    app.get('/countries/:isActive', getAll);
    app.get('/countries-by-id/:ID', getById);
    app.post('/countries', create);
    app.put('/countries/:ID', update);
    app.put('/countries/deactivate/:ID', deactivate);
    app.put('/countries/activate/:ID', activate);
};

export default CountriesRouter;
