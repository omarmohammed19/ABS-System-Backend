import express, { Request, Response } from 'express';
import { NewsController } from '../Controllers/NewsController';

const news = new NewsController();



async function getNewsByID(req: Request, res: Response) {
    try {
        const newsItem = await news.getNewsByID(Number(req.params.id));
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json('Could not get the news');
    }
}

async function addNews(req: Request, res: Response) {
    try {
        const newsItem = await news.addNews(req.body);
        res.status(200).json(newsItem);
    } catch (error) {
        console.log(error);
        res.status(500).json('Could not add a new news');
    }
}

async function index(req: Request, res: Response) {
    try {
        const newsItem = await news.index();
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json('Could not get the news');
    }
}

async function updateNews(req: Request, res: Response) {
    try {
        const newsItem = await news.updateNews({
            ID: Number(req.params.id),
            News: req.body.News,
            Active: req.body.Active,
        }
        );
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(404).json('The news is not found');
    }
}

async function deleteNews(req: Request, res: Response) {
    try {
        const newsItem = await news.deleteNews(Number(req.params.id));
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json('Could not delete the news');
    }
}

const newsRoutes = (app: express.Application) => {
    app.get('/news', index);
    app.post('/news', addNews);
    app.put('/news/:id', updateNews);
    app.delete('/news/:id', deleteNews);
    app.get('/news/:id', getNewsByID);
}


export default newsRoutes;
