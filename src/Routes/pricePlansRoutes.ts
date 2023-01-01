import express, { Request, Response } from 'express';
import { PricePlan } from '../Models/pricePlans';
import { PricePlansController } from '../Controllers/pricePlansController';

const pricePlansRouter = express.Router();
const pp = new PricePlansController();

async function getAllPricePlans(_req: Request, res: Response) {
  try {
    const pricePlans = await pp.index();
    res.status(200).json(pricePlans);
  } catch (error) {
    res.status(400).json('Could not get pricePlans');
  }
}

async function addPricePlan(req: Request, res: Response) {
  try {
    const pricePlan = await pp.addPricePlan(req.body);
    res.status(200).json(pricePlan);
  } catch (error) {
    res.status(400).json('Could not add pricePlans');
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
    };
    const pricePlan = await pp.updatePricePlan(p);
    res.status(200).json(pricePlan);
  } catch (error) {
    res.status(400).json('Could not update pricePlans');
  }
}

async function deletePricePlan(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const pricePlan = await pp.deletePricePlan(id);
    res.status(200).json(pricePlan);
  } catch (error) {
    res.status(400).json('Could not delete pricePlans');
  }
}

async function getPricePlansByID(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const pricePlan = await pp.getPricePlanByID(id);
    res.status(200).json(pricePlan);
  } catch (error) {
    res.status(400).json('Could not get pricePlans');
  }
}

async function getPricePlanMatrixByPricePlanID(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const pricePlan = await pp.getPricePlanMatrixByPricePlanID(id);
    res.status(200).json(pricePlan);
  } catch (error) {
    res.status(400).json('Could not get pricePlans');
  }
}

const pricePlansRoutes = (app: express.Application) => {
  app.get('/pricePlans', getAllPricePlans);
  app.post('/pricePlans', addPricePlan);
  app.put('/pricePlans/:id', updatePricePlan);
  app.delete('/pricePlans/:id', deletePricePlan);
  app.get('/pricePlans/:id', getPricePlansByID);
  app.get('/pricePlans/pricePlanMatrix/:id', getPricePlanMatrixByPricePlanID);
};

export default pricePlansRoutes;
