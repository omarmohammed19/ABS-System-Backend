import { sequelize } from '../../../Config/database';
import { PaymentInfo } from '../../../Backend/cust_PaymentInfo/Model';
import { SubAccounts } from '../../../Backend/cust_SubAccounts/Model';
import { BankDetails, BankDetailsModel } from '../../../Backend/cust_BankDetails/Model';
import { NearestBranch, NearestBranchModel } from '../../../Backend/cust_NearestBranch/Model';
import { MobileCash, MobileCashModel } from '../../../Backend/cust_MobileCash/Model';
import { WalletDetails, WalletDetailsModel } from '../../../Backend/cust_WalletDetails/Model';

export default class AddPaymentMethodsController {
  async addPaymentMethod(paymentMethodID: number, subAccountID: number, mobileCash: MobileCashModel, walletDetails: WalletDetailsModel, nearestBranch: NearestBranchModel, bankDetails: BankDetailsModel): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {

        let MobileCashID = null;
        let WalletDetailsID = null;
        let NearestBranchID = null;
        let BankDetailsID = null;

        if (paymentMethodID == 1) {
          
          MobileCashID = await MobileCash.create(
            {
              mobileNumber: mobileCash.mobileNumber
            },
            { transaction: t, returning: ['ID'] }
          );

        }
        else if (paymentMethodID == 2) {

          WalletDetailsID = await WalletDetails.create(
            {
              walletNumber: walletDetails.walletNumber,
              mobileNumber: walletDetails.mobileNumber
            },
            { transaction: t, returning: ['ID'] }
          );

        }
        else if (paymentMethodID == 3) {

          NearestBranchID = await NearestBranch.create(
            {
              branchID: nearestBranch.branchID
            },
            { transaction: t, returning: ['ID'] }
          );

        }
        else if (paymentMethodID == 4) {

          BankDetailsID = await BankDetails.create(
            {
              accountHolderName: bankDetails.accountHolderName,
              accountNumber: bankDetails.accountNumber,
              bankNameID: bankDetails.bankNameID,
              IBAN: bankDetails.IBAN,
              swiftCode: bankDetails.swiftCode,
            },
            { transaction: t, returning: ['ID'] }
          );

        }


        await PaymentInfo.create(
          {
            subAccountID: subAccountID,
            mobileCashID: MobileCashID?.ID,
            walletDetailsID: WalletDetailsID?.ID,
            nearestBranchID: NearestBranchID?.ID,
            bankDetailsID: BankDetailsID?.ID,
          },
          { transaction: t }
        );

        await SubAccounts.update(
          {
            paymentMethodID: paymentMethodID,
          },
          {
            where: {
              ID: subAccountID,
            },
            transaction: t,
          }
        );

        return 'Payment method added successfully';

      });
    } catch (err) {
      throw new Error(`Could not add payment method. Error: ${err}`);
    }
  }
}
