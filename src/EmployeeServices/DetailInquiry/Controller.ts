import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

export class TransactionsDetailInquiryController {
  async getTransactionsDetailInquiry(
    AWBs: string,
    Refs: string,
    Consignees: string,
    TransIDs: string,
    ContactNumbers: string,
    startPickupDate: Date,
    endPickupDate: Date,
    startCreationDate: Date,
    endCreationDate: Date,
    startLastChangeDate: Date,
    endLastChangeDate: Date,
    startDeliveryDate: Date,
    endDeliveryDate: Date,
    MainAccounts: string,
    SubAccounts: string,
    Statuses: string,
    Runner: string,
    Products: string,
    Services: string,
    Branches: string,
    collectedFromRunner: string,
    collectedFromBranch: string,
    paidToCustomers: string,
    dateFilter: string,
    limit: number,
    language: string
  ): Promise<any | string> {
    try {
      const result = await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const query = `
            EXEC [dbo].[p_GET_ship_TransactionsForDetailInquiry] 
            @Method = 'GET',
            @AWBs = :AWBs,
            @Refs = :Refs,
            @Consignees = :Consignees,
            @TransIDs = :TransIDs,
            @ContactNumbers = :ContactNumbers,
            @startPickupDate = :startPickupDate,
            @endPickupDate = :endPickupDate,
            @startCreationDate = :startCreationDate,
            @endCreationDate = :endCreationDate,
            @startLastChangeDate = :startLastChangeDate,
            @endLastChangeDate = :endLastChangeDate,
            @startDeliveryDate = :startDeliveryDate,
            @endDeliveryDate = :endDeliveryDate,
            @MainAccounts = :MainAccounts,
            @SubAccounts = :SubAccounts,
            @Statuses = :Statuses,
            @Runner = :Runner,
            @Products = :Products,
            @Services = :Services,
            @Branches = :Branches,
            @collectedFromRunner = :collectedFromRunner,
            @collectedFromBranch = :collectedFromBranch,
            @paidToCustomers = :paidToCustomers,
            @dateFilter = :dateFilter,
            @limit = :limit,
            @language = :language,
            @isActive = true
            
        `;
        const params = {
          AWBs: AWBs,
          Refs: Refs,
          Consignees: Consignees,
          TransIDs: TransIDs,
          ContactNumbers: ContactNumbers,
          startPickupDate: startPickupDate,
          endPickupDate: endPickupDate,
          startCreationDate: startCreationDate,
          endCreationDate: endCreationDate,
          startLastChangeDate: startLastChangeDate,
          endLastChangeDate: endLastChangeDate,
          startDeliveryDate: startDeliveryDate,
          endDeliveryDate: endDeliveryDate,
          MainAccounts: MainAccounts,
          SubAccounts: SubAccounts,
          Statuses: Statuses,
          Runner: Runner,
          Products: Products,
          Services: Services,
          Branches: Branches,
          collectedFromRunner: collectedFromRunner,
          collectedFromBranch: collectedFromBranch,
          paidToCustomers: paidToCustomers,
          dateFilter: dateFilter,
          limit: limit,
          language: language,
        };
        const queryOptions = {
          replacements: params,
          type: Sequelize.QueryTypes.SELECT,
          transaction: t,
        };

        const queryResult = await sequelize.query(query, queryOptions);
        return queryResult;
      });

      return result;
    } catch (err) {
      throw new Error(`Could not fetch Transactions Detail Inquiry. Error: ${err}`);
    }
  }
}
