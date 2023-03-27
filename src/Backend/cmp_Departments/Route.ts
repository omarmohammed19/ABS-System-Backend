import express, { Request, Response } from 'express';
import { DepartmentsController } from './Controller';
import { DepartmentsModel } from './Model';

const departmentsController = new DepartmentsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await departmentsController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};



const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await departmentsController.getDepartmentById(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const department = <DepartmentsModel>{
            enDepartmentName: req.body.enDepartmentName,
            arDepartmentName: req.body.arDepartmentName,
        };
        const result = await departmentsController.create(department);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const department = <DepartmentsModel>{
            ID: Number(req.params.ID),
            enDepartmentName: req.body.enDepartmentName,
            arDepartmentName: req.body.arDepartmentName,
        };
        const result = await departmentsController.update(department);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await departmentsController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await departmentsController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const departmentsRouter = (app: express.Application) => {
    app.get('/departments/:isActive', getAll);
    app.get('/departments-by-id/:ID', getById);
    app.post('/departments', create);
    app.put('/departments/:ID', update);
    app.put('/departments/de-activate/:ID', deactivate);
    app.put('/departments/activate/:ID', activate);
};

export default departmentsRouter;


