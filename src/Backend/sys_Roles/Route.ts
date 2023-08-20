import express, { Request, Response } from 'express';
import { RolesController } from './Controller';
import { RolesModel } from './Model';

const rolesController = new RolesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await rolesController.index(language);
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
        const result = await rolesController.getRolesByID(Number(req.params.ID), language);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}


const create = async (req: Request, res: Response) => {
    try {
        const role = <RolesModel>{
            enRole: req.body.enRole,
            arRole: req.body.arRole,
            roleTypeID: req.body.roleTypeID
        }
        const result = await rolesController.create(role);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}


const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await rolesController.deActivate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await rolesController.activate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}


const rolesRouter = (app: express.Application) => {
    app.get('/roles', getAll);
    app.get('/roles/:ID', getById);
    app.post('/roles', create);
    app.put('/roles/:ID/de-activate', deActivate);
    app.put('/roles/:ID/activate', activate);
}

export default rolesRouter;