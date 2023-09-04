import { ServiceTypesModel, ServiceTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language: string) => {
  return ServiceTypes.findOne({
    attributes: language === 'en' ? [['ID', 'Service Type ID'], ['enServiceType', 'Service Type'], ["price", "Price"], 'Notes'] : [['ID', 'رقم التسلسل'], ['arServiceType', 'نوع الخدمة'], ['price', 'السعر'], ['Notes', 'ملاحظات']],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class ServiceTypesController {
  async index(language: string, isActive: number): Promise<ServiceTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ServiceTypes.findAll({
          attributes: language === 'en' ? [['ID', 'Service Type ID'], ['enServiceType', 'Service Type'], ["price", "Price"], 'Notes'] : [['ID', 'رقم التسلسل'], ['arServiceType', 'نوع الخدمة'], ['price', 'السعر'], ['Notes', 'ملاحظات']],
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as ServiceTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all ServiceTypes. Error: ${err}`);
    }
  }

  async create(serviceTypes: ServiceTypesModel): Promise<ServiceTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await ServiceTypes.create(
          {
            enServiceType: serviceTypes.enServiceType,
            arServiceType: serviceTypes.arServiceType,
            price: serviceTypes.price,
            Notes: serviceTypes.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new ServiceTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new ServiceTypes. Error: ${err}`);
    }
  }

  async getServiceTypeById(ID: number, language: string): Promise<ServiceTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get ServiceTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get ServiceTypes by ID. Error: ${err}`);
    }
  }

  async update(serviceTypes: ServiceTypesModel, language: string): Promise<ServiceTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await ServiceTypes.update(
          {
            enServiceType: serviceTypes.enServiceType,
            arServiceType: serviceTypes.arServiceType,
            price: serviceTypes.price,
            Notes: serviceTypes.Notes,
          },
          {
            where: {
              ID: serviceTypes.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(serviceTypes.ID), t, language);
        return result ? result.toJSON() : 'Could not update ServiceTypes';
      });
    } catch (err) {
      throw new Error(`Could not update ServiceTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ServiceTypesModel>(ServiceTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ServiceTypes. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<ServiceTypesModel>(ServiceTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ServiceTypes. Error: ${err}`);
    }
  }
}
