import express, { Request, Response } from 'express';
import { TemplatesController } from './Controller';
import { TemplatesModel } from './Model';

const templatesController = new TemplatesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const result = await templatesController.index(language, isActive);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await templatesController.getTemplateByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getTemplatesByTemplateTypeID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const templateTypeID = Number(req.params.templateTypeID);
        const result = await templatesController.getTemplatesByTemplateTypeID(language, isActive, templateTypeID);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const template = <TemplatesModel>{
            enMessage: req.body.enMessage,
            arMessage: req.body.arMessage,
            templateTypeID: req.body.templateTypeID,
            Notes: req.body.Notes,
        };
        const result = await templatesController.create(template);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const template = <TemplatesModel>{
            ID: Number(req.params.ID),
            enMessage: req.body.enMessage,
            arMessage: req.body.arMessage,
            templateTypeID: req.body.templateTypeID,
            Notes: req.body.Notes,
        };
        const result = await templatesController.update(template, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await templatesController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await templatesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const templatesRouter = (app: express.Application) => {
    app.get('/templates/:isActive', getAll);
    app.get('/templates-by-id/:ID', getById);
    app.get('/templates-by-template-type-id/:templateTypeID/:isActive', getTemplatesByTemplateTypeID);
    app.post('/templates', create);
    app.put('/templates/:ID', update);
    app.put('/templates/de-activate/:ID', deActivate);
    app.put('/templates/activate/:ID', activate);
}

export default templatesRouter;