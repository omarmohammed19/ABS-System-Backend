import { TemplateTypes, TemplateTypesModel } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  return TemplateTypes.findOne({
    attributes: language === 'en' ? ['ID', 'enTemplateType', 'Notes'] : [['ID', 'ID'], ['arTemplateType', 'نوع النموذج'], ['Notes', 'ملحوظات']],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};

export class TemplateTypesController {
  async index(language: string, isActive: number): Promise<TemplateTypesModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await TemplateTypes.findAll({
          attributes: language === 'en' ? ['ID', 'enTemplateType', 'Notes'] : [['ID', 'ID'], ['arTemplateType', 'نوع النموذج'], ['Notes', 'ملحوظات']],
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as TemplateTypesModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all TemplateTypes. Error: ${err}`);
    }
  }

  async create(templateType: TemplateTypesModel): Promise<TemplateTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await TemplateTypes.create(
          {
            enTemplateType: templateType.enTemplateType,
            arTemplateType: templateType.arTemplateType,
            Notes: templateType.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new TemplateType';
      });
    } catch (err) {
      throw new Error(`Could not add new TemplateType. Error: ${err}`);
    }
  }

  async getTemplateTypeByID(language: string, ID: number): Promise<TemplateTypesModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get TemplateType by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get TemplateType by ID. Error: ${err}`);
    }
  }

  async update(templateType: TemplateTypesModel): Promise<TemplateTypesModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await TemplateTypes.update(
          {
            enTemplateType: templateType.enTemplateType,
            arTemplateType: templateType.arTemplateType,
            Notes: templateType.Notes,
          },
          {
            where: {
              ID: templateType.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );
        const result = await getById(Number(templateType.ID), t);
        return result ? result.toJSON() : 'Could not update TemplateType';
      });
    } catch (err) {
      throw new Error(`Could not update TemplateType. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<TemplateTypesModel>(TemplateTypes, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate TemplateType. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<TemplateTypesModel>(TemplateTypes, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate TemplateType. Error: ${err}`);
    }
  }
}
