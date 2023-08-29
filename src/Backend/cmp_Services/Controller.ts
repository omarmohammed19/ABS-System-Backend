import { CompanyServicesModel, CompanyServices } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enService', 'Notes'] : ['ID', 'arService', 'Notes'];
  return CompanyServices.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class CompanyServicesController {
  async index(language: string, isActive: number): Promise<CompanyServicesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enService', 'Notes'] : ['ID', 'arService', 'Notes'];
        const result = await CompanyServices.findAll({
          attributes: attributes,
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as CompanyServicesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all PackageType. Error: ${err}`);
    }
  }

  async create(services: CompanyServicesModel): Promise<CompanyServicesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await CompanyServices.create(
          {
            enService: services.enService,
            arService: services.arService,
            Notes: services.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new Services';
      });
    } catch (err) {
      throw new Error(`Could not add new PackageType. Error: ${err}`);
    }
  }

  async getPackageTypeById(language: string, ID: number): Promise<CompanyServicesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get Services by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get PackageType by ID. Error: ${err}`);
    }
  }

  async update(services: CompanyServicesModel): Promise<CompanyServicesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await CompanyServices.update(
          {
            enService: services.enService,
            arService: services.arService,
            Notes: services.Notes,
          },
          {
            where: {
              ID: services.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(services.ID), t);
        return result ? result.toJSON() : 'Could not update Services';
      });
    } catch (err) {
      throw new Error(`Could not update PackageType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<CompanyServicesModel>(CompanyServices, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate Services. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<CompanyServicesModel>(CompanyServices, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PackageType. Error: ${err}`);
    }
  }
}
