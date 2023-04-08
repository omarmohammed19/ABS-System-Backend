import { DepartmentsModel, Departments } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  return Departments.findOne({
    attributes: language === 'en' ? [['ID', 'Department ID'], ['enDepartmentName', 'Department']] : [['ID', 'رقم القسم'], ['arDepartmentName', 'اسم القسم']],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class DepartmentsController {
  async index(language: string, isActive: number): Promise<DepartmentsModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        // const attributes = language === 'en' ? [['ID', 'Department ID'], ['enDepartmentName', 'Department']] : ['ID', 'arDepartmentName'];
        const result = await Departments.findAll({
          attributes: language === 'en' ? [['ID', 'Department ID'], ['enDepartmentName', 'Department']] : [['ID', 'رقم القسم'], ['arDepartmentName', 'اسم القسم']],
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as DepartmentsModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all Departments. Error: ${err}`);
    }
  }



  async create(department: DepartmentsModel): Promise<DepartmentsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await Departments.create(
          {
            enDepartmentName: department.enDepartmentName,
            arDepartmentName: department.arDepartmentName,
            isActive: true,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not create new Department'; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not add new Department. Error: ${err}`);
    }
  }

  async getDepartmentById(language: string, ID: number): Promise<DepartmentsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ContactLogTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ContactLogTypes by ID. Error: ${err}`);
    }
  }

  async update(department: DepartmentsModel): Promise<DepartmentsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await Departments.update(
          {
            enDepartmentName: department.enDepartmentName,
            arDepartmentName: department.arDepartmentName,
          },
          {
            where: {
              ID: department.ID,
            },
            // fields: ['enContactLogType', 'arContactLogType', 'Notes'],
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(department.ID), t);
        return result ? result.toJSON() : 'Could not update Department'; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not update Department. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<DepartmentsModel | string> {
    try {
      const result = await De_Activate<DepartmentsModel>(Departments, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Department. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<DepartmentsModel | string> {
    try {
      const result = await De_Activate<DepartmentsModel>(Departments, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate Department. Error: ${err}`);
    }
  }
}
