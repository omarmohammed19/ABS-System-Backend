import express, { Request, Response } from 'express';
import { EmployeesController } from './Controller';
import { EmployeesModel } from './Model';

const employeesController = new EmployeesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await employeesController.index(language, Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getByTitleId = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await employeesController.getEmployeeByTitleID(Number(req.params.titleID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await employeesController.getEmployeeByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getEmployeeByHRCode = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await employeesController.getEmployeeByHRCode(Number(req.params.HRCode), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getEmployeeByFingerPrint = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await employeesController.getEmployeeByFingerPrintCode(req.params.fingerPrintCode, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const employee = <EmployeesModel>{
      enEmployeeName: req.body.enEmployeeName,
      arEmployeeName: req.body.arEmployeeName,
      Code: req.body.Code,
      fingerPrintCode: req.body.fingerPrintCode,
      HRCode: req.body.HRCode,
      titleID: req.body.titleID,
      departmentID: req.body.departmentID,
      branchID: req.body.branchID,
      hiringDate: req.body.hiringDate,
      IDNO: req.body.IDNO,
      contactNumberID: req.body.contactNumberID,
      Email: req.body.Email,
      Address: req.body.Address,
      salaryID: req.body.salaryID,
      dateOfBirth: req.body.dateOfBirth,
      genderID: req.body.genderID,
    };
    const result = await employeesController.create(employee);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const employee = <EmployeesModel>{
      ID: Number(req.params.ID),
      enEmployeeName: req.body.enEmployeeName,
      arEmployeeName: req.body.arEmployeeName,
      Code: req.body.Code,
      fingerPrintCode: req.body.fingerPrintCode,
      HRCode: req.body.HRCode,
      titleID: req.body.titleID,
      departmentID: req.body.departmentID,
      branchID: req.body.branchID,
      hiringDate: req.body.hiringDate,
      IDNO: req.body.IDNO,
      contactNumberID: req.body.contactNumberID,
      Email: req.body.Email,
      Address: req.body.Address,
      salaryID: req.body.salaryID,
      dateOfBirth: req.body.dateOfBirth,
      genderID: req.body.genderID,
    };
    const result = await employeesController.update(employee, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await employeesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await employeesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const employeesRouter = (app: express.Application) => {
  app.get('/employees/:isActive', getAll);
  app.get('/employees-by-title-id/:titleID', getByTitleId);
  app.get('/employees-by-id/:ID', getById);
  app.get('/employees-by-hr-code/:HRCode', getEmployeeByHRCode);
  app.get('/employees-by-finger-print/:fingerPrintCode', getEmployeeByFingerPrint);
  app.post('/employees', create);
  app.put('/employees/:ID', update);
  app.put('/employees/de-activate/:ID', deactivate);
  app.put('/employees/activate/:ID', activate);
};

export default employeesRouter;
