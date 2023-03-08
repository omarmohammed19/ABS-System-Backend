import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { CompanyInfo } from '../Models2/companyInfoModel';
import { companyInfoController } from '../Controllers2/companyInfoController';

dotenv.config();

const companyinfoController = new companyInfoController();

const getAll = async (_req: Request, res: Response) => {
    try {
        const result = await companyinfoController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getCompanyInfoByID = async (req: Request, res: Response) => {
    try {
        const result = await companyinfoController.getCompanyInfoByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addCompanyInfo = async (req: Request, res: Response) => {
    try {
        const companyInfo: CompanyInfo = {
            companyName: req.body.companyName
        }
        const result = await companyinfoController.create(companyInfo);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateCompanyInfo = async (req: Request, res: Response) => {

    try {
        const companyInfo: CompanyInfo = {
            ID: Number(req.params.id),
            companyName: req.body.companyName
        }
        const result = await companyinfoController.update(companyInfo);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteCompanyInfo = async (req: Request, res: Response) => {
    try {
        const result = await companyinfoController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const companyInfoRouter = (app: express.Application) => {
    app.post('/companyInfo', addCompanyInfo);
    app.get('/companyInfo/:id', getCompanyInfoByID);
    app.get('/companyInfo', getAll);
    app.put('/companyInfo/:id', updateCompanyInfo);
    app.delete('/companyInfo/:id', deleteCompanyInfo);
}

export default companyInfoRouter;