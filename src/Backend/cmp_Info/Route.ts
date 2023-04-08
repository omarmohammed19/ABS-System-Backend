import express, { Request, Response } from 'express';
import { InfoController } from './Controller';
import { InfoModel } from './Model';

const infoController = new InfoController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await infoController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await infoController.getInfoById(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const info = <InfoModel>{
            enCompanyName: req.body.enCompanyName,
            arCompanyName: req.body.arCompanyName,
        };
        const result = await infoController.create(info);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const info = <InfoModel>{
            ID: Number(req.params.ID),
            enCompanyName: req.body.enCompanyName,
            arCompanyName: req.body.arCompanyName,
        };
        const result = await infoController.update(info);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await infoController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await infoController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const infoRouter = (app: express.Application) => {
    app.get('/company-info', getAll);
    app.get('/company-info/:ID', getById);
    app.post('/company-info', create);
    app.put('/company-info/:ID', update);
    app.put('/company-info/deactivate/:ID', deactivate);
    app.put('/company-info/activate/:ID', activate);
}

export default infoRouter;
