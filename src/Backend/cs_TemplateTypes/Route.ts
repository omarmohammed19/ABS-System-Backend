import express, { Request, Response } from 'express';
import { TemplateTypesController } from './Controller';
import { TemplateTypesModel } from './Model';

const templateTypesController = new TemplateTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await templateTypesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await templateTypesController.getTemplateTypeByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const templateTypes = <TemplateTypesModel>{
            enTemplateType: req.body.enTemplateType,
            arTemplateType: req.body.arTemplateType,
            Notes: req.body.Notes,
        };
        const result = await templateTypesController.create(templateTypes);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const templateTypes = <TemplateTypesModel>{
            ID: Number(req.params.ID),
            enTemplateType: req.body.enTemplateType,
            arTemplateType: req.body.arTemplateType,
            Notes: req.body.Notes,
        };
        const result = await templateTypesController.update(templateTypes);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await templateTypesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await templateTypesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const TemplateTypesRouter = (app: express.Application) => {
    app.get('/template-types/:isActive', getAll);
    app.get('/template-types-by-id/:ID', getById);
    app.post('/template-types', create);
    app.put('/template-types/:ID', update);
    app.put('/template-types/deactivate/:ID', deactivate);
    app.put('/template-types/activate/:ID', activate);
};

export default TemplateTypesRouter;
