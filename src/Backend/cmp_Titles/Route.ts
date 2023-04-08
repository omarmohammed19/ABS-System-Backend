import express, { Request, Response } from 'express';
import { TitlesController } from './Controller';
import { TitlesModel } from './Model';

const titlesController = new TitlesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await titlesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await titlesController.getTitleById(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const title = <TitlesModel>{
            enTitleName: req.body.enTitleName,
            arTitleName: req.body.arTitleName,
        };
        const result = await titlesController.create(title);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const title = <TitlesModel>{
            ID: Number(req.params.ID),
            enTitleName: req.body.enTitleName,
            arTitleName: req.body.arTitleName,
        };
        const result = await titlesController.update(title);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await titlesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await titlesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const titlesRouter = (app: express.Application) => {
    app.get('/titles/:isActive', getAll);
    app.get('/titles-by-id/:ID', getById);
    app.post('/titles', create);
    app.put('/titles/:ID', update);
    app.put('/titles/deactivate/:ID', deactivate);
    app.put('/titles/activate/:ID', activate);
}

export default titlesRouter;