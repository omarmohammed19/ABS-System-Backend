import express, { Request, Response } from 'express';
import { ticketCategoriesController } from '../Controllers/ticketCategoriesController';

const ticketCategoriesRouter = express.Router();
const ticketCat = new ticketCategoriesController();

async function getTicketCategoryByID(req: Request, res: Response) {
    try {
        const ticketCategory = await ticketCat.getTicketCategoryByID(Number(req.params.id));
        res.status(200).json(ticketCategory);
    } catch (error) {
        res.status(500).json('Could not get the ticket category');
    }
}
async function addTicketCategory(req: Request, res: Response) {
    try {
        const ticketCategory = await ticketCat.addTicketCategory(req.body);
        res.status(200).json(ticketCategory);
    } catch (error) {
        res.status(500).json('Could not add a new ticket category');
    }
}
async function getTicketCategory(req: Request, res: Response) {
    try {
        const ticketCategory = await ticketCat.getTicketCategory();
        res.status(200).json(ticketCategory);
    } catch (error) {
        res.status(500).json('Could not get ticket category');
    }
}
async function deleteTicketCategory(req: Request, res: Response) {
    try {
        const ticketCategory = await ticketCat.deleteTicketCategory(Number(req.params.id));
        res.status(200).json(ticketCategory);
    } catch (error) {
        res.status(500).json('Could not delete the ticket category');
    }
}
async function updateTicketCategory(req: Request, res: Response) {
    try {
        const ticketCategory = await ticketCat.updateTicketCategory({
            ID: Number(req.params.id),
            Category: req.body.ticketCategory,
        });
        res.status(200).json(ticketCategory);
    } catch (error) {
        res.status(404).json('The ticket category is not found');
    }
}
const ticketCategories_endpoints = (app: express.Application) => {
    app.get('/ticketCategory/get/:id', getTicketCategoryByID);
    app.get('/ticketCategory/get', getTicketCategory);
    app.post('/ticketCategory/add', addTicketCategory);
    app.delete('/ticketCategory/delete/:id', deleteTicketCategory);
    app.put('/ticketCategory/update/:id', updateTicketCategory);
};

export { ticketCategories_endpoints, ticketCategoriesRouter };
