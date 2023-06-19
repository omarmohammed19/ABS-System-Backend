import express, { Request, Response } from 'express';
import { RoleTypesController } from './Controller';
import { RoleTypesModel } from './Model';

const roleTypesController = new RoleTypesController();


const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await roleTypesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await roleTypesController.getRoleTypeByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const roleType = <RoleTypesModel>{
            enRoleType: req.body.enRoleType,
            arRoleType: req.body.arRoleType,
            Notes: req.body.Notes,
        };
        const result = await roleTypesController.create(roleType);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const roleType = <RoleTypesModel>{
            ID: Number(req.params.ID),
            enRoleType: req.body.enRoleType,
            arRoleType: req.body.arRoleType,
            Notes: req.body.Notes,
        };
        const result = await roleTypesController.update(roleType, language);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await roleTypesController.deactivate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await roleTypesController.activate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const roleTypeRouter = (app: express.Application) => {
    app.get('/role-types/:isActive', getAll);
    app.get('/role-types-by-id/:ID', getById);
    app.post('/role-types', create);
    app.put('/role-types/:ID', update);
    app.put('/role-types/de-activate/:ID', deactivate);
    app.put('/role-types/activate/:ID', activate);
}

export default roleTypeRouter;



