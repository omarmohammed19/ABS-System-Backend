import express, { Request, Response } from 'express'
import { SalesChannel } from '../Models/salesChannels'
import { SalesChannelsController } from '../Controllers/salesChannelsController'


const salesChannelsRouter = express.Router();
const sc = new SalesChannelsController();


async function getAllSalesChannels(req: Request, res: Response) {
    try {
        const salesChannels = await sc.index();
        res.status(200).json(salesChannels);
    } catch (error) {
        res.status(400).json("Could not get salesChannels");
    }
}


async function addSalesChannel(req: Request, res: Response) {
    try {
        const salesChannel = await sc.addSalesChannel(req.body);
        res.status(200).json(salesChannel);
    } catch (error) {
        res.status(400).json("Could not add salesChannel");
    }
}


async function updateSalesChannel(req: Request, res: Response) {
    try {
        const s: SalesChannel = {
            ID: Number(req.params.id),
            salesChannelName: req.body.salesChannelName,
            companyInfoID: Number(req.body.companyInfoID),
            salesChannelTypeID: Number(req.body.salesChannelTypeID),
            salesChannelURL: req.body.salesChannelURL
        }
        const salesChannel = await sc.updateSalesChannel(s);
        res.status(200).json(salesChannel);
    } catch (error) {
        res.status(400).json("Could not update salesChannel");
    }
}


async function deleteSalesChannel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const salesChannel = await sc.deleteSalesChannel(id);
        res.status(200).json(salesChannel);
    } catch (error) {
        res.status(400).json("Could not delete salesChannel");
    }
}


async function getSalesChannelByID(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const salesChannel = await sc.getSalesChannelByID(id);
        res.status(200).json(salesChannel);
    } catch (error) {
        res.status(400).json("Could not get salesChannel");
    }
}


const salesChannelsRoutes = (app: express.Application) => {
    app.get('/salesChannels', getAllSalesChannels);
    app.post('/salesChannels', addSalesChannel);
    app.put('/salesChannels/:id', updateSalesChannel);
    app.delete('/salesChannels/:id', deleteSalesChannel);
    app.get('/salesChannels/:id', getSalesChannelByID);
}


export default salesChannelsRoutes;