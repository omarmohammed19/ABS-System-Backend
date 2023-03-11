import express, { Request, Response } from 'express';
import { ProductsController } from './Controller';
import { ProductsModel } from './Model';

const productsController = new ProductsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await productsController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await productsController.getProductById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = <ProductsModel>{
      enProduct: req.body.enProduct,
      arProduct: req.body.enProduct,
      requireIDNO: req.body.requireIDNO,
      Notes: req.body.Notes,
    };
    const result = await productsController.create(product);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product = <ProductsModel>{
      ID: Number(req.params.ID),
      enProduct: req.body.enProduct,
      arProduct: req.body.arProduct,
      requireIDNO: req.body.requireIDNO,
      Notes: req.body.Notes,
    };
    const result = await productsController.update(product);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await productsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await productsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productsRouter = (app: express.Application) => {
  app.get('/products', getAll);
  app.get('/products/:ID', getById);
  app.post('/products', create);
  app.put('/products/:ID', update);
  app.put('/products/deactivate/:ID', deactivate);
  app.put('/products/activate/:ID', activate);
};

export default productsRouter;
