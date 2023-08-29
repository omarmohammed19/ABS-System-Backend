import { sequelize } from '../../../Config/database';
import Sequelize from 'sequelize';
import { Addresses, AddressesModel } from '../../../Backend/cust_Addresses/Model';
import { SalesChannels, SalesChannelsModel } from '../../../Backend/cust_SalesChannels/Model';
import { Info, InfoModel } from '../../../Backend/cmp_Info/Model';
import { MainAccounts } from '../../../Backend/cust_MainAccounts/Model';
import { ca } from 'date-fns/locale';
import { SubAccounts } from '../../../Backend/cust_SubAccounts/Model';
import { Services } from '../../../Backend/cust_Services/Model';
import { LegalPapers } from '../../../Backend/cust_LegalPapers/Model';

export class BusinessInfoController {
  async addBusinessInfo(companyInfo: InfoModel, mainAccountID: number, salesChannel: SalesChannelsModel, address: AddressesModel, productTypeID: number, prefix: string, serviceTypesIDs: number[], nationalID: string, commercialRegister: string): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const cmpInfo = await Info.create(
          {
            enCompanyName: companyInfo.enCompanyName,
            arCompanyName: companyInfo.arCompanyName,
          },
          { transaction: t, returning: ['ID'] } // pass transaction object to query
        );

        await MainAccounts.update(
          {
            cmpInfoID: cmpInfo.ID,
          },
          {
            where: {
              ID: mainAccountID,
            },
            transaction: t,
          }
        );

        const prefixExist = await SubAccounts.findOne({
          where: {
            prefix: prefix,
          },
          transaction: t,
        });

        if (prefixExist) {
          return "Prefix Already Exists";
        }

        await SubAccounts.update(
          {
            productTypeID: productTypeID,
            prefix: prefix,
          },
          {
            where: {
              ID: address.subAccountID,
            },
            transaction: t,
          }
        )

        await SalesChannels.create(
          {
            cmpInfoID: cmpInfo.ID,
            salesChannelName: salesChannel.salesChannelName,
            salesChannelURL: salesChannel.salesChannelURL,
            salesChannelTypeID: salesChannel.salesChannelTypeID,
          },
          { transaction: t }
        );

        await Addresses.create(
          {
            subAccountID: address.subAccountID,
            streetName: address.streetName,
            apartmentNumber: address.apartmentNumber,
            floorNumber: address.floorNumber,
            buildingNumber: address.buildingNumber,
            cityID: address.cityID,
            postalCode: address.postalCode,
            addressTypeID: 1,
            longitude: address.longitude,
            latitude: address.latitude,
          },
          { transaction: t }
        );

        if (serviceTypesIDs.length > 0) {
          for (let i = 0; i < serviceTypesIDs.length; i++) {
            await Services.create(
              {
                subAccountID: address.subAccountID,
                serviceTypeID: serviceTypesIDs[i],
              },
              { transaction: t }
            );
          }
        }

        if (nationalID !== '') {
          await LegalPapers.create(
            {
              mainAccountID: mainAccountID,
              legalPaperTypeID: 1,
              legalPaperImage: nationalID,
            },
            { transaction: t }
          );
        }

        if (commercialRegister !== '') {
          await LegalPapers.create(
            {
              mainAccountID: mainAccountID,
              legalPaperTypeID: 2,
              legalPaperImage: commercialRegister,
            },
            { transaction: t }
          );
        }

        return "Business Info Added Successfully";

      });
    } catch (err) {
      throw new Error(`Could not add new Business Info. Error: ${err}`);
    }
  }

  async getCompanyInfo(subAccountID: number): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        const query = 'EXEC [dbo].[p_GET_BusinessInfo] @subAccountID = :subAccountID, @Method = :Method';
        const replacements = { subAccountID: subAccountID, Method: 'GET_BySubAccountID' };
        const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
        const result = await sequelize.query(query, options);

        return result;
      });
    }
    catch (err) {
      throw new Error(`Could not get Company Info. Error: ${err}`);
    }
  }

}