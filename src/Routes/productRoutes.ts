import express, { Request, Response } from 'express'
import { Product } from '../Models/Products'
import { ProductsController } from '../Controllers/productsController'


const productRouter = express.Router();
const pro = new ProductsController();


async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await pro.index();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json("Could not get products");
    }
}


async function addProduct(req: Request, res: Response) {
    try {
        const product = await pro.addProduct(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Could not add products");
    }
}


async function updateProduct(req: Request, res: Response) {
    try {
        const p: Product = {
            ID: Number(req.params.id),
            productName: req.body.productName
        }
        const product = await pro.updateProduct(p);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Could not update products");
    }
}


async function deleteProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const product = await pro.deleteProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Could not delete products");
    }
}


async function getProductByID(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const product = await pro.getProductByID(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Could not get products");
    }
}






const productRoutes = (app: express.Application) => {
    app.get('/products', getAllProducts);
    app.post('/products', addProduct);
    app.put('/products/:id', updateProduct);
    app.delete('/products/:id', deleteProduct);
    app.get('/products/:id', getProductByID);
}


export default productRoutes;




