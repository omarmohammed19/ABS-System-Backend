import express, { Request, Response } from 'express';
import { telephoneTypesController } from '../Controllers2/telephoneTypesController';

const telephoneTypesRouter = express.Router();
const telType = new telephoneTypesController();

async function getTelephoneTypeByID(req: Request, res: Response) {
  try {
    const telephoneType = await telType.getTelephoneTypeByID(Number(req.params.id));
    res.status(200).json(telephoneType);
  } catch (error) {
    res.status(500).json('Could not get the telephone type');
  }
}
async function addTelephoneType(req: Request, res: Response) {
  try {
    const telephoneType = await telType.addTelephoneType(req.body);
    res.status(200).json(telephoneType);
  } catch (error) {
    res.status(500).json('Could not add a new telephone type');
  }
}
async function getTelephoneType(req: Request, res: Response) {
  try {
    const telephoneType = await telType.getTelephoneType();
    res.status(200).json(telephoneType);
  } catch (error) {
    res.status(500).json('Could not get telephone type');
  }
}
async function deleteTelephoneType(req: Request, res: Response) {
  try {
    const telephoneType = await telType.deleteTelephoneType(Number(req.params.id));
    res.status(200).json(telephoneType);
  } catch (error) {
    res.status(500).json('Could not delete the telephone type');
  }
}
async function updateTelephoneType(req: Request, res: Response) {
  try {
    const telephoneType = await telType.updateTelephoneType({
      ID: Number(req.params.id),
      telephoneType: req.body.telephoneType,
    });
    res.status(200).json(telephoneType);
  } catch (error) {
    res.status(404).json('The telephone type is not found');
  }
}
const telephoneTypes_endpoints = (app: express.Application) => {
  app.get('/telephoneType/get/:id', getTelephoneTypeByID);
  app.get('/telephoneType/get', getTelephoneType);
  app.post('/telephoneType/add', addTelephoneType);
  app.delete('/telephoneType/delete/:id', deleteTelephoneType);
  app.put('/telephoneType/update/:id', updateTelephoneType);
};
export default telephoneTypes_endpoints;
