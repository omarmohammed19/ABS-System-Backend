import express, { Request, Response } from 'express';
import { TransactionsDetailInquiryController } from './Controller';

const transactionsForDetailInquiryController = new TransactionsDetailInquiryController();

const getTransactionsForDetailInquiry = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const limit = req.params.limit ? parseInt(req.params.limit as string) : 10;
    const result = await transactionsForDetailInquiryController.getTransactionsDetailInquiry(
      req.body.AWBs ? req.body.AWBs : '',
      req.body.Refs ? req.body.Refs : '',
      req.body.Consignees ? req.body.Consignees : '',
      req.body.TransIDs ? req.body.TransIDs : '',
      req.body.ContactNumbers ? req.body.ContactNumbers : '',
      req.body.startPickupDate ? req.body.startPickupDate : '',
      req.body.endPickupDate ? req.body.endPickupDate : '',
      req.body.startCreationDate ? req.body.startCreationDate : '',
      req.body.endCreationDate ? req.body.endCreationDate : '',
      req.body.startLastChangeDate ? req.body.startLastChangeDate : '',
      req.body.endLastChangeDate ? req.body.endLastChangeDate : '',
      req.body.startDeliveryDate ? req.body.startDeliveryDate : '',
      req.body.endDeliveryDate ? req.body.endDeliveryDate : '',
      req.body.MainAccounts ? req.body.MainAccounts : '',
      req.body.SubAccounts ? req.body.SubAccounts : '',
      req.body.Statuses ? req.body.Statuses : '',
      req.body.Runner ? req.body.Runner : '',
      req.body.Products ? req.body.Products : '',
      req.body.Services ? req.body.Services : '',
      req.body.Branches ? req.body.Branches : '',
      req.body.collectedFromRunner ? req.body.collectedFromRunner : '',
      req.body.collectedFromBranch ? req.body.collectedFromBranch : '',
      req.body.paidToCustomers ? req.body.paidToCustomers : '',
      req.body.dateFilter ? req.body.dateFilter : '',
      limit,
      language
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const transactionsForDetailInquiryRouter = (app: express.Application) => {
  app.post('/transactions-for-detail-inquiry/:limit?', getTransactionsForDetailInquiry);
};

export default transactionsForDetailInquiryRouter;
