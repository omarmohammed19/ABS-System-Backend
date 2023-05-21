import express, { Request, Response } from 'express';
import AddPaymentMethodsController from './Controller';
import { BankDetailsModel } from '../../../Backend/cust_BankDetails/Model';
import { NearestBranchModel } from '../../../Backend/cust_NearestBranch/Model';
import { MobileCashModel } from '../../../Backend/cust_MobileCash/Model';
import { WalletDetailsModel } from '../../../Backend/cust_WalletDetails/Model';

const addPaymentMethodsController = new AddPaymentMethodsController();

const addPaymentMethod = async (req: Request, res: Response) => {
  try {

    //@ts-ignore
    const subAccountID = req.subAccountID;

    const mobileCash = <MobileCashModel>(<unknown>{
      mobileNumber: req.body.mobileCashNumber
    })

    const walletDetails = <WalletDetailsModel>{
      walletNumber: req.body.walletNumber,
      mobileNumber: req.body.mobileWalletNumber
    }

    const nearestBranch = <NearestBranchModel>{
      branchID: req.body.branchID
    }

    const bankDetails = <BankDetailsModel>{
      accountHolderName: req.body.accountHolderName,
      accountNumber: req.body.accountNumber,
      bankNameID: req.body.bankNameID,
      IBAN: req.body.IBAN,
      swiftCode: req.body.swiftCode,
    }

    const paymentMethodID = Number(req.params.paymentMethodID);

    const result = await addPaymentMethodsController.addPaymentMethod(paymentMethodID, subAccountID, mobileCash, walletDetails, nearestBranch, bankDetails);

    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

const AddPaymentMethodsRouter = (app: express.Application) => {
  app.post('/add-payment-method/:paymentMethodID', addPaymentMethod);
};

export default AddPaymentMethodsRouter;
