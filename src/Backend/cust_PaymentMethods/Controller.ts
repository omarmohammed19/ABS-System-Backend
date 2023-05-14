import { PaymentMethodsModel, PaymentMethods } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import { Transaction } from 'sequelize';

const getById = (ID: number, t: Transaction, language?: string) => {
  return PaymentMethods.findOne({
    attributes: language === 'en' ? [['ID', 'Payment Method ID'], ['enPaymentMethodType', 'Payment Method Type'], 'Notes'] : [['ID', 'رقم التسلسل'], ['arPaymentMethodType', 'نوع طريقة الدفع'], ['Notes', 'ملاحظات']],
    where: {
      ID: ID,
      isActive: true,
    },
    transaction: t, // pass transaction object to query
  });
};



export class PaymentMethodsController {
  async index(language: string, isActive: number): Promise<PaymentMethodsModel[]> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PaymentMethods.findAll({
          attributes: language === 'en' ? [['ID', 'Payment Method ID'], ['enPaymentMethodType', 'Payment Method Type'], 'Notes'] : [['ID', 'رقم التسلسل'], ['arPaymentMethodType', 'نوع طريقة الدفع'], ['Notes', 'ملاحظات']],
          where: {
            isActive: isActive,
          },
          transaction: t, // pass transaction object to query
        });

        return result.map((item: any) => item.toJSON()) as PaymentMethodsModel[]; // return the result of the query (if successful) to be committed automatically
      });
    } catch (err) {
      throw new Error(`Could not get all PaymentMethods. Error: ${err}`);
    }
  }

  async create(paymentMethods: PaymentMethodsModel): Promise<PaymentMethodsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const result = await PaymentMethods.create(
          {
            enPaymentMethodType: paymentMethods.enPaymentMethodType,
            arPaymentMethodType: paymentMethods.arPaymentMethodType,
            Notes: paymentMethods.Notes,
          },
          { transaction: t } // pass transaction object to query
        );
        return result ? result.toJSON() : 'Could not add new PaymentMethods';
      });
    } catch (err) {
      throw new Error(`Could not add new PaymentMethods. Error: ${err}`);
    }
  }

  async getPaymentMethodById(ID: number, language: string): Promise<PaymentMethodsModel | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const item = await getById(ID, t, language); // pass transaction object to getById function
        return item ? item.toJSON() : 'Could not get PaymentMethods by ID';
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get PaymentMethods by ID. Error: ${err}`);
    }
  }

  async update(paymentMethods: PaymentMethodsModel, language: string): Promise<PaymentMethodsModel | string> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        await PaymentMethods.update(
          {
            enPaymentMethodType: paymentMethods.enPaymentMethodType,
            arPaymentMethodType: paymentMethods.arPaymentMethodType,
            Notes: paymentMethods.Notes,
          },
          {
            where: {
              ID: paymentMethods.ID,
            },
            transaction: t, // pass transaction object to query
          }
        );

        const result = await getById(Number(paymentMethods.ID), t, language);
        return result ? result.toJSON() : 'Could not update PaymentMethods';
      });
    } catch (err) {
      throw new Error(`Could not update PaymentMethods. Error: ${err}`);
    }
  }

  async deactivate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PaymentMethodsModel>(PaymentMethods, 'ID', ID, 'deactivate');
      return result;
    } catch (err) {
      throw new Error(`Could not deactivate PaymentMethods. Error: ${err}`);
    }
  }

  async activate(ID: number): Promise<string> {
    try {
      const result = await De_Activate<PaymentMethodsModel>(PaymentMethods, 'ID', ID, 'activate');
      return result;
    } catch (err) {
      throw new Error(`Could not activate PaymentMethods. Error: ${err}`);
    }
  }
}
