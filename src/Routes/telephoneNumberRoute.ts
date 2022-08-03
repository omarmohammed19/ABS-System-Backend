import express, { Request, Response } from 'express';
import { telephoneNumberController } from '../Controllers/telephoneNumberController';

const telephoneNumberRouter = express.Router();
const telephoneNum = new telephoneNumberController();

async function getTelephoneNumberByID(req: Request, res: Response) {
  try {
    const telephoneNumber = await telephoneNum.getTelephoneNumberByID(Number(req.params.id));
    res.status(200).json(telephoneNumber);
  } catch (error) {
    res.status(500).json('Could not get the telephone number');
  }
}
async function addTelephoneNumber(req: Request, res: Response) {
  try {
    const telephoneNumber = await telephoneNum.addTelephoneNumber(req.body);
    res.status(200).json(telephoneNumber);
  } catch (error) {
    res.status(500).json('Could not add a new telephone number');
  }
}
async function getTelephoneNumber(req: Request, res: Response) {
  try {
    const telephoneNumber = await telephoneNum.getTelephoneNumber();
    res.status(200).json(telephoneNumber);
  } catch (error) {
    res.status(500).json('Could not get telephone number');
  }
}
async function deleteTelephoneNumber(req: Request, res: Response) {
  try {
    const telephoneNumber = await telephoneNum.deleteTelephoneNumber(Number(req.params.id));
    res.status(200).json(telephoneNumber);
  } catch (error) {
    res.status(500).json('Could not delete the telephone number');
  }
}
async function updateTelephoneNumber(req: Request, res: Response) {
  try {
    const telephoneNumber = await telephoneNum.updateTelephoneNumber({
      ID: Number(req.params.id),
      telephoneNumber: req.body.telephoneNumber,
      userInfoID: req.body.userInfoID,
      companyInfoID: req.body.companyInfoID,
      contactPersonID: req.body.contactPersonID,
      telephoneTypeID: req.body.telephoneTypeID,
    });
    res.status(200).json(telephoneNumber);
  } catch (error) {
    res.status(404).json('The telephone number is not found');
  }
}
const telephoneNumber_endpoints = (app: express.Application) => {
  app.get('/telephoneNumber/get/:id', getTelephoneNumberByID);
  app.get('/telephoneNumber/get', getTelephoneNumber);
  app.post('/telephoneNumber/add', addTelephoneNumber);
  app.delete('/telephoneNumber/delete/:id', deleteTelephoneNumber);
  app.put('/telephoneNumber/update/:id', updateTelephoneNumber);
};
export default telephoneNumber_endpoints;
