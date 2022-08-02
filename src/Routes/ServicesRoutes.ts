import express, { Request, Response } from 'express'
import { Services } from '../Models/Services'
import { ServicesController } from '../Controllers/ServicesController'


const servicesRouter = express.Router();
const s1 = new ServicesController();


async function getAllServices(req: Request, res: Response) {
    try {
        const services = await s1.index();
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json("Could not get services");
    }
}


async function addService(req: Request, res: Response) {
    try {
        const service = await s1.addService(req.body);
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json("Could not add services");
    }
}


async function updateService(req: Request, res: Response) {
    try {
        const s: Services = {
            ID: Number(req.params.id),
            subAccountID: req.body.subAccountID,
            serviceTypeID: req.body.serviceTypeID,
        }
        const service = await s1.updateService(s);
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json("Could not update services");
    }
}


async function deleteService(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const service = await s1.deleteService(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json("Could not delete services");
    }
}


async function getServiceByID(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const service = await s1.getServiceByID(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json("Could not get services");
    }
}


const servicesRoutes = (app: express.Application) => {
    app.get('/services', getAllServices);
    app.post('/services', addService);
    app.put('/services/:id', updateService);
    app.delete('/services/:id', deleteService);
    app.get('/services/:id', getServiceByID);
}


export default servicesRoutes;
