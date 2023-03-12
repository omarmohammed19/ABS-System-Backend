import { PackageTypesModel, PackageTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  const attributes = language === 'en' ? ['ID', 'enPackageType', 'Notes'] : ['ID', 'arPackageType', 'Notes'];
  return PackageTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class PackageTypesController {
  async index(language: string): Promise<PackageTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const attributes = language === 'en' ? ['ID', 'enPackageType', 'Notes'] : ['ID', 'arPackageType', 'Notes'];
        const result = await PackageTypes.findAll({
          attributes: attributes,
          where: {
            isActive: true,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as PackageTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all PackageType. Error: ${err}`);
    }
  }

  async create(packageTypes: PackageTypesModel): Promise<PackageTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PackageTypes.create(
          {
            enPackageType: packageTypes.enPackageType,
            arPackageType: packageTypes.arPackageType,
            Notes: packageTypes.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new PackageTypes';
      });
    } catch (err) {
      throw new Error(`Could not add new PackageType. Error: ${err}`);
    }
  }

  async getPackageTypeById(language: string, ID: number): Promise<PackageTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get PackageTypes by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get PackageType by ID. Error: ${err}`);
    }
  }

  async update(packageTypes: PackageTypesModel): Promise<PackageTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await PackageTypes.update(
          {
            enPackageType: packageTypes.enPackageType,
            arPackageType: packageTypes.arPackageType,
            Notes: packageTypes.Notes,
          },
          {
            where: {
              ID: packageTypes.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(packageTypes.ID), t);
        return result ? result.toJSON() : 'Could not update PackageTypes';
      });
    } catch (err) {
      throw new Error(`Could not update PackageType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PackageTypesModel>(PackageTypes, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PackageTypes. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PackageTypesModel>(PackageTypes, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PackageType. Error: ${err}`);
    }
  }
}
