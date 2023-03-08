import express, { Request, Response } from 'express'
import { SalesChannelType } from '../Models2/salesChannelsType'
import { SalesChannelTypeController } from '../Controllers2/salesChannelTypeController'


const salesChannelTypeRouter = express.Router();
const sct = new SalesChannelTypeController();


async function getAllSalesChannelTypes(req: Request, res: Response) {
    try {
        const salesChannelTypes = await sct.index();
        res.status(200).json(salesChannelTypes);
    } catch (error) {
        res.status(400).json("Could not get salesChannelTypes");
    }
}


async function addSalesChannelType(req: Request, res: Response) {
    try {
        const salesChannelType = await sct.addSalesChannelType(req.body);
        res.status(200).json(salesChannelType);
    } catch (error) {
        res.status(400).json("Could not add salesChannelType");
    }
}


async function updateSalesChannelType(req: Request, res: Response) {
    try {
        const sc: SalesChannelType = {
            ID: Number(req.params.id),
            salesChannelType: req.body.salesChannelType
        }
        const salesChannelType = await sct.updateSalesChannelType(sc);
        res.status(200).json(salesChannelType);
    } catch (error) {
        res.status(400).json("Could not update salesChannelType");
        console.log(error);
    }
}


async function deleteSalesChannelType(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const salesChannelType = await sct.deleteSalesChannelType(id);
        res.status(200).json(salesChannelType);
    } catch (error) {
        res.status(400).json("Could not delete salesChannelType");
    }
}


async function getSalesChannelTypeByID(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const salesChannelType = await sct.getSalesChannelTypeByID(id);
        res.status(200).json(salesChannelType);
    } catch (error) {
        res.status(400).json("Could not get salesChannelType");
    }
}


const salesChannelTypeRoutes = (app: express.Application) => {
    app.get('/salesChannelTypes', getAllSalesChannelTypes);
    app.post('/salesChannelTypes', addSalesChannelType);
    app.put('/salesChannelTypes/:id', updateSalesChannelType);
    app.delete('/salesChannelTypes/:id', deleteSalesChannelType);
    app.get('/salesChannelTypes/:id', getSalesChannelTypeByID);
}


export default salesChannelTypeRoutes;