import express, { Request, Response } from 'express';
import { ServicesTypesController } from '../Controllers/servicesTypesController';

const serviceTypesRouter = express.Router();
const service = new ServicesTypesController();

async function getServicesTypesByID(req: Request, res: Response) {
  try {
    const servicesTypes = await service.getServiceTypesByID(Number(req.params.id));
    res.status(200).json(servicesTypes);
  } catch (error) {
    res.status(500).json('Could not get servicesTypes');
  }
}
async function addServicesTypes(req: Request, res: Response) {
  try {
    const servicesTypes = await service.addServicesTypes(req.body);
    res.status(200).json(servicesTypes);
  } catch (error) {
    res.status(500).json('Could not add servicesTypes');
  }
}
async function getServicesTypes(req: Request, res: Response) {
  try {
    const servicesTypes = await service.getServicesTypes();
    res.status(200).json(servicesTypes);
  } catch (error) {
    res.status(500).json('Could not get servicesTypes');
  }
}
async function deleteServicesTypes(req: Request, res: Response) {
  try {
    const servicesTypes = await service.deleteServicesTypes(Number(req.params.id));
    res.status(200).json(servicesTypes);
  } catch (error) {
    res.status(500).json('Could not delete servicesTypes');
  }
}
async function updateServicesTypes(req: Request, res: Response) {
  try {
    const servicesTypes = await service.updateServicesTypes({
      ID: Number(req.params.id),
      serviceType: req.body.serviceType,
    });
    res.status(200).json(servicesTypes);
  } catch (error) {
    res.status(500).json('The service type is not found');
  }
}
const servicesTypes_endpoints = (app: express.Application) => {
  app.get('/servicestypes/get/:id', getServicesTypesByID);
  app.get('/servicestypes/get', getServicesTypes);
  app.post('/servicestypes/add', addServicesTypes);
  app.delete('/servicestypes/delete/:id', deleteServicesTypes);
  app.put('/servicestypes/update/:id', updateServicesTypes);
};
export default servicesTypes_endpoints;
