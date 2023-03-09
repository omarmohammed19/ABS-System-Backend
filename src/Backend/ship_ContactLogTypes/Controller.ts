import { ContactLogTypesModel, ContactLogTypes } from './Model';
import { De_Activate } from '../../Services/De_Activate';

const getById = (ID: Number, language?: string) => {
  const attributes = (language === 'en') ? ['ID', 'enContactLogType', 'Notes'] : ['ID', 'arContactLogType', 'Notes'];
  return ContactLogTypes.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
  });
}

export class ContactLogTypesController {
  async index(language: string): Promise<ContactLogTypesModel[]> {
    try {
      const attributes = (language === 'en') ? ['ID', 'enContactLogType', 'Notes'] : ['ID', 'arContactLogType', 'Notes'];
      const result = await ContactLogTypes.findAll({
        attributes: attributes,
        where: {
          isActive: true,
        },
      });
      return result.map((item: any) => item.toJSON()) as ContactLogTypesModel[];
    } catch (err) {
      throw new Error(`Could not get all ContactLogTypes. Error: ${err}`);
    }
  }

  async getContactLogTypeById(language: string, ID: number): Promise<ContactLogTypesModel | string> {
    try {
      const result = await getById(ID, language);
      return result ? result.toJSON() : 'Could not get ContactLogTypes by ID';
    } catch (err) {
      throw new Error(`Could not get ContactLogTypes by ID. Error: ${err}`);
    }
  }

  async create(contactLogType: ContactLogTypesModel): Promise<ContactLogTypesModel | string> {
    try {
      const result = await ContactLogTypes.create(
        {
          enContactLogType: contactLogType.enContactLogType,
          arContactLogType: contactLogType.arContactLogType,
          Notes: contactLogType.Notes,
        },
        {
          fields: ['enContactLogType', 'arContactLogType', 'Notes'],
        }
      );
      return result ? result.toJSON() : 'Could not add new ContactLogTypes';
    } catch (err) {
      throw new Error(`Could not add new ContactLogTypes. Error: ${err}`);
    }
  }

  async update(contactLogType: ContactLogTypesModel): Promise<ContactLogTypesModel | string> {
    try {
      await ContactLogTypes.update(
        {
          enContactLogType: contactLogType.enContactLogType,
          arContactLogType: contactLogType.arContactLogType,
          Notes: contactLogType.Notes,
        },
        {
          where: {
            ID: contactLogType.ID,
          },
        }
      );
      const result = await getById(Number(contactLogType.ID));
      return result ? result.toJSON() : 'Could not update ContactLogTypes';
    } catch (err) {
      throw new Error(`Could not update ContactLogTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<ContactLogTypesModel>(ContactLogTypes, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate ContactLogTypes. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<ContactLogTypesModel>(ContactLogTypes, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate ContactLogTypes. Error: ${err}`);
    }
  }
}
