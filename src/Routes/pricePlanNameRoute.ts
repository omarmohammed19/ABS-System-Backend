import express, { Request, Response } from 'express';
import { pricePlanNameModel } from '../Models/pricePlanNameModel';
import { pricePlanNameController } from '../Controllers/pricePlanNameController';

const pricePlanNameRouter = express.Router();
const ppn = new pricePlanNameController();

async function getAllPricePlanNames(_req: Request, res: Response) {
  try {
    const pricePlanNames = await ppn.index();
    res.status(200).json(pricePlanNames);
  } catch (error) {
    res.status(400).json('Could not get pricePlanNames');
  }
}

async function addPricePlanName(req: Request, res: Response) {
  try {
    const pricePlanName = await ppn.addpricePlanName(req.body);
    res.status(200).json(pricePlanName);
  } catch (error) {
    res.status(400).json('Could not add pricePlanNames');
  }
}

async function updatePricePlanName(req: Request, res: Response) {
  try {
    const p: pricePlanNameModel = {
      ID: Number(req.params.id),
      Name: req.body.Name,
    };
    const pricePlanName = await ppn.updatePricePlanName(p);
    res.status(200).json(pricePlanName);
  } catch (error) {
    res.status(400).json('Could not update pricePlanNames');
  }
}

async function deletePricePlanName(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const pricePlanName = await ppn.deletePricePlanName(id);
    res.status(200).json(pricePlanName);
  } catch (error) {
    res.status(400).json('Could not delete pricePlanNames');
  }
}

async function getPricePlanNamesByID(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const pricePlanName = await ppn.getPricePlanNameByID(id);
    res.status(200).json(pricePlanName);
  } catch (error) {
    res.status(400).json('Could not get pricePlanNames');
  }
}

const pricePlanNameRoutes = (app: express.Application) => {
  app.get('/pricePlanName', getAllPricePlanNames);
  app.post('/pricePlanName', addPricePlanName);
  app.put('/pricePlanName/:id', updatePricePlanName);
  app.delete('/pricePlanName/:id', deletePricePlanName);
  app.get('/pricePlanName/:id', getPricePlanNamesByID);
};

export default pricePlanNameRoutes;
