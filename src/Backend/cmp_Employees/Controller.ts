import { EmployeesModel, Employees } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByTitleId = (titleID: number, t: Transaction, language?: string) => {
  return Employees.findAll({
    attributes: language === 'en' ? ['ID', 'enEmployeeName'] : ['ID', 'arEmployeeName'],
    where: {
      titleID: titleID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

const getById = (ID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cmp_Employees] @language = :language, @Method = :Method, @ID = :ID';
  const replacements = { language: language, Method: 'GET_ByID', ID: ID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = sequelize.query(query, options);
  return result as unknown as EmployeesModel;
};

const getByDepartmentID = (departmentID: number, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cmp_Employees] @language = :language, @Method = :Method, @departmentID = :departmentID';
  const replacements = { language: language, Method: 'GET_ByDepartmentID', departmentID: departmentID };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = sequelize.query(query, options);
  return result as unknown as EmployeesModel[];
};

const getByRoleID = (roleIDs: string, t: Transaction, language?: string) => {
  const query = 'EXEC [dbo].[p_GET_cmp_Employees] @language = :language, @Method = :Method, @roleIDs = :roleIDs';
  const replacements = { language: language, Method: 'GET_ByRoleIDs', roleIDs: roleIDs };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = sequelize.query(query, options);
  return result as unknown as EmployeesModel[];
};

export class EmployeesController {
  async index(language: string, isActive: number): Promise<EmployeesModel[]> {
    {
      const query = 'EXEC [dbo].[p_GET_cmp_Employees] @language = :language, @Method = :Method, @isActive = :isActive';
      const replacements = { language: language, Method: 'GET', isActive: isActive };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as EmployeesModel[];
    }
  }

  async create(employee: EmployeesModel): Promise<EmployeesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = await Employees.create(
          {
            enEmployeeName: employee.enEmployeeName,
            arEmployeeName: employee.arEmployeeName,
            Code: employee.Code,
            fingerPrintCode: employee.fingerPrintCode,
            HRCode: employee.HRCode,
            titleID: employee.titleID,
            departmentID: employee.departmentID,
            branchID: employee.branchID,
            hiringDate: employee.hiringDate,
            IDNO: employee.IDNO,
            contactNumberID: employee.contactNumberID,
            Email: employee.Email,
            Address: employee.Address,
            salaryID: employee.salaryID,
            dateOfBirth: employee.dateOfBirth,
            genderID: employee.genderID,
            isActive: true,
          },
          { transaction: t }
        );
        return result;
      });
    } catch (err) {
      throw new Error(`Could not add new Employee. Error: ${err}`);
    }
  }

  async getEmployeeByID(ID: number, language: string): Promise<EmployeesModel> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getById(ID, t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get UserSession by ID. Error: ${err}`);
    }
  }

  async getEmployeeByTitleID(titleID: number, language: string): Promise<EmployeesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getByTitleId(titleID, t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get UserSession by ID. Error: ${err}`);
    }
  }

  async getEmployeeByHRCode(Code: number, language: string): Promise<EmployeesModel> {
    const query = 'EXEC [dbo].[p_GET_cmp_Employees] @language = :language, @Method = :Method, @HRCode = :HRCode';
    const replacements = { language: language, Method: 'GET_ByHRCode', HRCode: Code };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
    const result = await sequelize.query(query, options);
    return result as unknown as EmployeesModel;
  }

  async getByDepartmentID(departmentID: number, language: string): Promise<EmployeesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getByDepartmentID(departmentID, t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get Employees by ID. Error: ${err}`);
    }
  }

  async getEmployeeByFingerPrintCode(Code: string, language: string): Promise<EmployeesModel> {
    {
      const query = 'EXEC [dbo].[p_GET_cmp_Employees] @language = :language, @Method = :Method, @fingerPrintCode = :fingerPrintCode';
      const replacements = { language: language, Method: 'GET_ByFingerPrintCode', fingerPrintCode: Code };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = await sequelize.query(query, options);
      return result as unknown as EmployeesModel;
    }
  }

  async getByRoleID(roleID: string, language: string): Promise<EmployeesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        const result = getByRoleID(roleID, t, language);
        return result;
      });
    } catch (err) {
      throw new Error(`Could not get Employees by ID. Error: ${err}`);
    }
  }

  async update(employee: EmployeesModel, language: string): Promise<EmployeesModel | string> {
    {
      try {
        return await sequelize.transaction(async (t) => {
          await Employees.update(
            {
              enEmployeeName: employee.enEmployeeName,
              arEmployeeName: employee.arEmployeeName,
              Code: employee.Code,
              fingerPrintCode: employee.fingerPrintCode,
              HRCode: employee.HRCode,
              titleID: employee.titleID,
              departmentID: employee.departmentID,
              branchID: employee.branchID,
              hiringDate: employee.hiringDate,
              IDNO: employee.IDNO,
              contactNumberID: employee.contactNumberID,
              Email: employee.Email,
              Address: employee.Address,
              salaryID: employee.salaryID,
              dateOfBirth: employee.dateOfBirth,
              genderID: employee.genderID,
            },
            { where: { ID: employee.ID }, transaction: t }
          );
          return getById(employee.ID, t, language);
        });
      } catch (err) {
        throw new Error(`Could not update Employee. Error: ${err}`);
      }
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<EmployeesModel>(Employees, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate User Session. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<EmployeesModel>(Employees, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate User Session. Error: ${err}`);
    }
  }
}
