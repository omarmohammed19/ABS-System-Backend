import express, { Request, Response } from 'express';
import { NewsController } from './Controller';
import { NewsModel } from './Model';

const newsController = new NewsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await newsController.index(language, Number(req.params.isActive));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await newsController.getNewsByID(Number(req.params.ID), language);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const news = <NewsModel>{
            enNews: req.body.enNews,
            arNews: req.body.arNews,
        };
        const result = await newsController.create(news);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const news = <NewsModel>{
            ID: Number(req.params.ID),
            enNews: req.body.enNews,
            arNews: req.body.arNews,
        };
        const result = await newsController.update(news, lang);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await newsController.deactivate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await newsController.activate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const newsRouter = (app: express.Application) => {
    app.get('news/:isActive', getAll);
    app.get('news-by-id/:ID', getById);
    app.post('news', create);
    app.put('news/:ID', update);
    app.put('news/de-activate/:ID', deactivate);
    app.put('news/activate/:ID', activate);
}

export default newsRouter;
