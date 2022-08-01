import express, { Request, Response } from 'express'
import { NearestBranch } from '../Models/nearestBranch'
import { NearestBranchController } from '../Controllers/nearestBranchController'


const nearestBranchRouter = express.Router();
const n1 = new NearestBranchController();


async function getAllNearestBranch(req: Request, res: Response) {
    try {
        const nearestBranch = await n1.index();
        res.status(200).json(nearestBranch);
    } catch (error) {
        res.status(400).json("Could not get nearestBranch");
    }
}


async function addNearestBranch(req: Request, res: Response) {
    try {
        const nearestBranch = await n1.addNearestBranch(req.body);
        console.log(nearestBranch);
        res.status(200).json(nearestBranch);
    } catch (error) {
        res.status(400).json("Could not add nearestBranch");
    }
}


async function updateNearestBranch(req: Request, res: Response) {
    try {
        const nb: NearestBranch = {
            ID: Number(req.params.id),
            brancheID: Number(req.body.brancheID)
        }
        const nearestBranch = await n1.updateNearestBranch(nb);
        console.log(nearestBranch);
        res.status(200).json(nearestBranch);
    } catch (error) {
        res.status(400).json("Could not update nearestBranch");
        console.log(error);
    }
}


async function deleteNearestBranch(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const nearestBranch = await n1.deleteNearestBranch(id);
        console.log(nearestBranch);
        res.status(200).json(nearestBranch);
    } catch (error) {
        res.status(400).json("Could not delete nearestBranch");
    }
}


async function getNearestBranchByID(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const nearestBranch = await n1.getNearestBranch(id);
        console.log(nearestBranch);
        res.status(200).json(nearestBranch);
    } catch (error) {
        res.status(400).json("Could not get nearestBranch");
    }
}


const nearestBranchRoutes = (app: express.Application) => {
    app.get('/nearestBranch', getAllNearestBranch);
    app.post('/nearestBranch', addNearestBranch);
    app.put('/nearestBranch/:id', updateNearestBranch);
    app.delete('/nearestBranch/:id', deleteNearestBranch);
    app.get('/nearestBranch/:id', getNearestBranchByID);

}


export default nearestBranchRoutes;
