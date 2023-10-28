import express, { Request, Response } from 'express';
import { GenderController } from './Controller';
import { GendersModel } from './Model';

const gendersController = new GenderController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await gendersController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        console.log('🚀 ~ file: Route.ts:15 ~ getAll ~ error:', error);
        
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await gendersController.getGenderByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const gender = <GendersModel>{
            enGender: req.body.enGender,
            arGender: req.body.arGender,
        };
        const result = await gendersController.create(gender);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const gender = <GendersModel>{
            ID: Number(req.params.ID),
            enGender: req.body.enGender,
            arGender: req.body.arGender,
        };
        const result = await gendersController.update(gender, lang);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await gendersController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await gendersController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const gendersRouter = (app: express.Application) => {
    app.get('/genders/:isActive', getAll);
    app.get('/genders-by-id/:ID', getById);
    app.post('/genders', create);
    app.put('/genders/:ID', update);
    app.put('/genders/de-activate/:ID', deactivate);
    app.put('/genders/activate/:ID', activate);
}

export default gendersRouter; 