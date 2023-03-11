import { SubAccountsModel, SubAccounts } from './Model';
import { De_Activate } from '../../Services/De_Activate';

const getById = (ID: Number, language?: string) => {
  const attributes = (language === 'en') ? ['ID', 'enContactLogType', 'Notes'] : ['ID', 'arContactLogType', 'Notes'];
  return SubAccounts.findOne({
    attributes: attributes,
    where: {
      ID: ID,
      isActive: true,
    },
  });
}

export class ContactLogTypesController {
  async index(language: string): Promise<SubAccountsModel[]> {
    try {
      const attributes = (language === 'en') ? ['ID', 'enContactLogType', 'Notes'] : ['ID', 'arContactLogType', 'Notes'];
      const result = await SubAccounts.findAll({
        attributes: attributes,
        where: {
          isActive: true,
        },
      });
      return result.map((item: any) => item.toJSON()) as SubAccountsModel[];
    } catch (err) {
      throw new Error(`Could not get all SubAccounts. Error: ${err}`);
    }
  }

  async getContactLogTypeById(language: string, ID: number): Promise<SubAccountsModel | string> {
    try {
      const result = await getById(ID, language);
      return result ? result.toJSON() : 'Could not get SubAccounts by ID';
    } catch (err) {
      throw new Error(`Could not get SubAccounts by ID. Error: ${err}`);
    }
  }

  async create(subAccount: SubAccountsModel): Promise<SubAccountsModel | string> {
    try {
      const result = await SubAccounts.create(
        {
          mainAccountID: subAccount.mainAccountID,
          subAccountName: subAccount.subAccountName,
          accountNumber: subAccount.accountNumber,
          pricePlanID: subAccount.pricePlanID,
          paymentMethodID: subAccount.paymentMethodID,
          productTypeID: subAccount.productTypeID,
          customerServiceID: subAccount.customerServiceID,
          prefix: subAccount.prefix,
          creationDate: subAccount.creationDate,
        },
        {
          fields: ['mainAccountID', 'subAccountName', 'accountNumber', 'pricePlanID', 'paymentMethodID', 'productTypeID', 'customerServiceID', 'prefix', 'creationDate'],
        }
      );
      return result ? result.toJSON() : 'Could not add new SubAccounts';
    } catch (err) {
      throw new Error(`Could not add new SubAccounts. Error: ${err}`);
    }
  }

  async update(subAccount: SubAccountsModel): Promise<SubAccountsModel | string> {
    try {
      await SubAccounts.update(
        {
          mainAccountID: subAccount.mainAccountID,
          subAccountName: subAccount.subAccountName,
          accountNumber: subAccount.accountNumber,
          pricePlanID: subAccount.pricePlanID,
          paymentMethodID: subAccount.paymentMethodID,
          productTypeID: subAccount.productTypeID,
          customerServiceID: subAccount.customerServiceID,
          prefix: subAccount.prefix,
          creationDate: subAccount.creationDate,
        },
        {
          where: {
            ID: subAccount.ID,
          },
        }
      );
      const result = await getById(Number(subAccount.ID));
      return result ? result.toJSON() : 'Could not update SubAccounts';
    } catch (err) {
      throw new Error(`Could not update SubAccounts. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = De_Activate<SubAccountsModel>(SubAccounts, ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate SubAccounts. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = De_Activate<SubAccountsModel>(SubAccounts, ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate SubAccounts. Error: ${err}`);
    }
  }
}
