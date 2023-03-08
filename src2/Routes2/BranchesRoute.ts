import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { Branch } from '../Models2/BranchesModel';
import { BranchesController } from '../Controllers2/BranchesController';

dotenv.config();

const branchesController = new BranchesController();

const getAll = async (_req: Request, res: Response) => {
    try {
        const result = await branchesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getBranchByID = async (req: Request, res: Response) => {
    try {
        const result = await branchesController.getBranchByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addBranch = async (req: Request, res: Response) => {
    try {
        const branch: Branch = {
            branchName: req.body.branchName
        }
        const result = await branchesController.create(branch);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateBranch = async (req: Request, res: Response) => {
    try {
        const branch: Branch = {
            branchID: Number(req.params.id),
            branchName: req.body.branchName
        }
        const result = await branchesController.update(branch);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteBranch = async (req: Request, res: Response) => {
    try {
        const result = await branchesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}


const branchesRouter = (app: express.Application) => {
    app.post('/branch', addBranch);
    app.get('/branch/:id', getBranchByID);
    app.get('/branch', getAll);
    app.put('/branch/:id', updateBranch);
    app.delete('/branch/:id', deleteBranch);
}

export default branchesRouter;