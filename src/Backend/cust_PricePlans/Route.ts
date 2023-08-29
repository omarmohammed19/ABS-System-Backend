import express, { Request, Response } from 'express';
import { PricePlansController } from './Controller';
import { PricePlansModel } from './Model';
import Sequalize from 'sequelize';
import { log } from 'console';

const pricePlansController = new PricePlansController();

const currentDate = Sequalize.literal('GETDATE()');

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await pricePlansController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getByPricePlanID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await pricePlansController.getPriceplanByPricePlanID(Number(req.params.pricePlanID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getBySubAccountID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await pricePlansController.getPricePlanBySubAccountID(Number(req.params.subAccountID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getPricePlanMatrixBySubAccountID = async (req: Request, res: Response) => {
    try {
        const result = await pricePlansController.getPricePlanMatrixBySubAccountID(Number(req.params.subAccountID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getPricePlanMatrixByID = async (req: Request, res: Response) => {
    try {
        const result = await pricePlansController.getPricePlanMatrixByID(Number(req.params.pricePlanID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const create = async (req: Request, res: Response) => {
    try {
        let pricePlan = req.body;
        for (let i = 0; i < pricePlan.length; i++) {
            pricePlan[i].discount = (100 - Number(pricePlan[i].discount)) / 100;
        }
        const result = await pricePlansController.create(pricePlan);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const pricePlan = <PricePlansModel>{
            ID: Number(req.params.ID),
            pricePlanID: req.body.pricePlanID,
            fromZoneID: req.body.fromZoneID,
            toZoneID: req.body.toZoneID,
            price: req.body.price,
            discount: (100 - Number(req.body.discount)) / 100,
            extraKilosStart: req.body.extraKilosStart,
            extraKilosFees: req.body.extraKilosFees,
            priceOnAll: req.body.priceOnAll
        };
        const result = await pricePlansController.update(pricePlan, language);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await pricePlansController.deactivate(Number(req.params.pricePlanID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await pricePlansController.activate(Number(req.params.pricePlanID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const pricePlansRouter = (app: express.Application) => {
    app.get('/price-plans/:isActive', getAll);
    app.get('/price-plans-by-price-plan-ID/:pricePlanID', getByPricePlanID);
    app.get('/price-plans-by-sub-account-ID/:subAccountID', getBySubAccountID);
    app.get('/price-plans-matrix-by-sub-account-ID/:subAccountID', getPricePlanMatrixBySubAccountID);
    app.get('/price-plans-matrix-by-ID/:pricePlanID', getPricePlanMatrixByID);
    app.post('/price-plans', create);
    app.put('/price-plans/:ID', update);
    app.put('/price-plans/deactivate/:pricePlanID', deactivate);
    app.put('/price-plans/activate/:pricePlanID', activate);
};

export default pricePlansRouter;
