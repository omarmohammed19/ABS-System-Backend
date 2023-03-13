import express, { Request, Response } from 'express';
import { LanguagesController } from './Controller';
import { LanguagesModel } from './Model';

const languagesController = new LanguagesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await languagesController.index();
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const result = await languagesController.getLanguageByID(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const language = <LanguagesModel>{
            Language: req.body.Language,
        };
        const result = await languagesController.create(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const language = <LanguagesModel>{
            ID: Number(req.params.ID),
            Language: req.body.Language,
        };
        const result = await languagesController.update(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await languagesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await languagesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}