import { ContactLogTypesModel, ContactLogTypes } from './Model';

export class ContactLogTypesController {
  async index(): Promise<ContactLogTypesModel[]> {
    try {
      const result = await ContactLogTypes.findAll({
        attributes: ['ID', 'enContactLogType', 'arContactLogType', 'Notes'],
        where: {
          isActive: true,
        },
      });
      return result.map((item: any) => item.toJSON()) as ContactLogTypesModel[];
    } catch (err) {
      throw new Error(`Could not get all ContactLogTypes. Error: ${err}`);
    }
  }

  async getContactLogTypeById(ID: number): Promise<ContactLogTypesModel | string> {
    try {
      const result = await ContactLogTypes.findOne({
        attributes: ['ID', 'enContactLogType', 'arContactLogType', 'Notes'],
        where: {
          ID: ID,
          isActive: true,
        },
      });
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
      const result = await ContactLogTypes.findOne({
        attributes: ['ID', 'enContactLogType', 'arContactLogType', 'Notes'],
        where: {
          ID: contactLogType.ID,
          isActive: true,
        },
      });
      return result ? result.toJSON() : 'Could not update ContactLogTypes';
    } catch (err) {
      throw new Error(`Could not update ContactLogTypes. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const check = (await ContactLogTypes.findOne({
        attributes: ['isActive'],
        where: {
          ID: ID,
        },
      })) as ContactLogTypesModel | null;

      if (check == null) {
        return 'ID is not found';
      } else if (check.isActive == false) {
        return 'Already Deactivated';
      }
      const result = await ContactLogTypes.update(
        {
          isActive: false,
        },
        {
          where: {
            ID: ID,
          },
        }
      );
      return result ? 'ContactLogTypes deactivated' : 'Could not deactivate ContactLogTypes';
    } catch (err) {
      throw new Error(`Could not deactivate ContactLogTypes. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const check = (await ContactLogTypes.findOne({
        attributes: ['isActive'],
        where: {
          ID: ID,
        },
      })) as ContactLogTypesModel | null;
      console.log(check);

      if (check == null) {
        return 'ID is not found';
      } else if (check.isActive == true) {
        return 'Already Activated';
      }
      const result = await ContactLogTypes.update(
        {
          isActive: true,
        },
        {
          where: {
            ID: ID,
          },
        }
      );

      return result[0] == 1 ? 'ContactLogTypes activated' : 'Could not activate ContactLogTypes';
    } catch (err) {
      throw new Error(`Could not activate ContactLogTypes. Error: ${err}`);
    }
  }
}
