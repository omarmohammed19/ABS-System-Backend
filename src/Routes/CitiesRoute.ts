import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { City } from '../Models/CitiesModel';
import { CitiesController } from '../Controllers/CitiesController';

dotenv.config();

const citiesController = new CitiesController();

const getAll = async (_req: Request, res: Response) => {
    try {
        const result = await citiesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getCityByID = async (req: Request, res: Response) => {
    try {
        const result = await citiesController.getCityByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addCity = async (req: Request, res: Response) => {
    try {
        const city: City = {
            cityName: req.body.cityName,
            governorateID: Number(req.body.governorateID)
        }
        const result = await citiesController.create(city);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateCity = async (req: Request, res: Response) => {
    try {
        const city: City = {
            ID: Number(req.params.id),
            cityName: req.body.cityName,
            governorateID: Number(req.body.governorateID)
        }
        const result = await citiesController.update(city);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteCity = async (req: Request, res: Response) => {
    try {
        const result = await citiesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const citiesRouter = (app: express.Application) => {
    app.post('/city', addCity);
    app.get('/city/:id', getCityByID);
    app.get('/city', getAll);
    app.put('/city/:id', updateCity);
    app.delete('/city/:id', deleteCity);
}

export default citiesRouter;

