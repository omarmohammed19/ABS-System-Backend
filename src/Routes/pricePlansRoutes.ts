import express, { Request, Response } from 'express'
import { PricePlan } from '../Models/pricePlans'
import { PricePlansController } from '../Controllers/pricePlansController'


const pricePlansRouter = express.Router();
const pp = new PricePlansController();


async function getAllPricePlans(req: Request, res: Response) {
    try {
        const pricePlans = await pp.index();
        res.status(200).json(pricePlans);
    } catch (error) {
        res.status(400).json("Could not get pricePlans");
    }
}


async function addPricePlan(req: Request, res: Response) {
    try {
        const pricePlan = await pp.addPricePlan(req.body);
        console.log(pricePlan);
        res.status(200).json(pricePlan);
    } catch (error) {
        res.status(400).json("Could not add pricePlans");
    }
}


async function updatePricePlan(req: Request, res: Response) {
    try {
        const p: PricePlan = {
            ID: Number(req.params.id),
            fromZoneID: Number(req.body.fromZoneID),
            toZoneID: Number(req.body.toZoneID),
            price: Number(req.body.price),
            pricePlanID: Number(req.body.pricePlanID),
            numberOfShipments: Number(req.body.numberOfShipments)
        }
        const pricePlan = await pp.updatePricePlan(p);
        console.log(pricePlan);
        res.status(200).json(pricePlan);
    } catch (error) {
        res.status(400).json("Could not update pricePlans");
    }
}


async function deletePricePlan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const pricePlan = await pp.deletePricePlan(id);
        console.log(pricePlan);
        res.status(200).json(pricePlan);
    } catch (error) {
        res.status(400).json("Could not delete pricePlans");
    }
}


async function getPricePlansByID(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const pricePlan = await pp.getPricePlanByID(id);
        console.log(pricePlan);
        res.status(200).json(pricePlan);
    } catch (error) {
        res.status(400).json("Could not get pricePlans");
    }
}


const pricePlansRoutes = (app: express.Application) => {
    app.get('/pricePlans', getAllPricePlans);
    app.post('/pricePlans', addPricePlan);
    app.put('/pricePlans/:id', updatePricePlan);
    app.delete('/pricePlans/:id', deletePricePlan);
    app.get('/pricePlans/:id', getPricePlansByID);
}


export default pricePlansRoutes;