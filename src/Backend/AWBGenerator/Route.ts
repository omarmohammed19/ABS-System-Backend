import express, { Request, Response } from 'express';
import { AWBController } from './Controller';


const awbController = new AWBController();

const generatePdf = async (req: Request, res: Response) => {
    try {
        const pdfBytes = await awbController.generatePdf(req.body.accountName, req.body.accountNumber, req.body.senderContactPerson,
            req.body.senderContactNumber, req.body.senderAddress, req.body.receiverContactPerson, req.body.receiverContactNumber,
            req.body.receiverAddress, req.body.COD, req.body.absFees, req.body.total, req.body.content, req.body.weight,
            req.body.pieces, req.body.serviceType, req.body.ref, req.body.specialInstructions);
        res.contentType('application/pdf');
        res.send(pdfBytes);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const awbRouter = (app: express.Application) => {
    app.post('/generate-awb', generatePdf);
}

export default awbRouter;
