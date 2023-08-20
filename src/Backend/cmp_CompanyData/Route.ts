import express, { Request, Response } from 'express';
import { CompanyDataController } from './Controller';
import { CompanyData, companyDataModel } from './Model';
import app from '../../server';


const companyDataController = new CompanyDataController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await companyDataController.index(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await companyDataController.getcompanyDataByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const companyData = <companyDataModel>{
            enCompanyName: req.body.enCompanyName,
            arCompanyName: req.body.arCompanyName,
            Website: req.body.Website,
            enAddress: req.body.enAddress,
            arAddress: req.body.arAddress,
            Hotline: req.body.Hotline,
            Telephone1: req.body.Telephone1,
            Telephone2: req.body.Telephone2,
            Telephone3: req.body.Telephone3,
        }
        const result = await companyDataController.create(companyData);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const companyData = <companyDataModel>{
            ID: Number(req.params.ID),
            enCompanyName: req.body.enCompanyName,
            arCompanyName: req.body.arCompanyName,
            Website: req.body.Website,
            enAddress: req.body.enAddress,
            arAddress: req.body.arAddress,
            Hotline: req.body.Hotline,
            Telephone1: req.body.Telephone1,
            Telephone2: req.body.Telephone2,
            Telephone3: req.body.Telephone3,
        }
        const result = await companyDataController.update(companyData);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await companyDataController.activate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await companyDataController.deActivate(Number(req.params.ID));
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const companyDataRouter = (app: express.Application) => {
    app.get('/companyData', getAll);
    app.get('/companyData-by-id/:ID', getById);
    app.post('/companyData', create);
    app.put('/companyData/:ID', update);
    app.put('/companyData/activate/:ID', activate);
    app.put('/companyData/de-activate/:ID', deactivate);
}

export default companyDataRouter;
