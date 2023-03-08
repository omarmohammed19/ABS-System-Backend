import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { Country } from '../Models2/CountriesModel';
import { CountriesController } from '../Controllers2/CountriesController';

dotenv.config();

const countriesController = new CountriesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await countriesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getCountryByID = async (req: Request, res: Response) => {
    try {
        const result = await countriesController.getCountryByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addCountry = async (req: Request, res: Response) => {
    try {
        const country: Country = {
            countryName: req.body.countryName
        }
        const result = await countriesController.create(country);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateCountry = async (req: Request, res: Response) => {
    try {
        const country: Country = {
            ID: Number(req.params.id),
            countryName: req.body.countryName
        }
        const result = await countriesController.update(country);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteCountry = async (req: Request, res: Response) => {
    try {
        const result = await countriesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const CountriesRouter = (app: express.Application) => {
    app.post('/country', addCountry);
    app.get('/country/:id', getCountryByID);
    app.get('/country', getAll);
    app.put('/country/:id', updateCountry);
    app.delete('/country/:id', deleteCountry);
}

export default CountriesRouter;