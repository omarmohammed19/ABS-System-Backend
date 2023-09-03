import express, { Request, Response } from 'express';
import { AWBController } from './Controller';


const awbController = new AWBController();

const generatePdf = async (req: Request, res: Response) => {
    try {
        const AWBs = req.params.AWB.split(',');
        const pdfBytes = await awbController.generatePdf(AWBs);
        res.contentType('application/pdf');
        res.send(pdfBytes);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const awbRouter = (app: express.Application) => {
    app.post('/generate-awb/:AWB', generatePdf);
}

export default awbRouter;
