import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';
import { Addresses } from '../../Backend/cnee_Addresses/Model';
import { Transactions } from '../../Backend/ship_Transactions/Model';
import { ContactNumbers } from '../../Backend/cnee_ContactNumbers/Model';
import { CallPlans } from '../../Backend/cc_CallPlans/Model';

export class CallCenterController {
    async updateShipmentDetails(AWB: String, callPlanID: Number, callResultID: Number, userID: Number, streetName?: String, aptNumber?: String, floorNumber?: String, buildNumber?: String, cityID?: Number, postalCode?: String, contactNumber?: String[], appointment?: Date): Promise<any> {
        const t = await sequelize.transaction();
        try {
            const result = await sequelize.transaction(async (t) => {
                await CallPlans.update(
                    {
                        callResultID: callResultID,
                    }
                    , {
                        where: {
                            ID: callPlanID,
                        },
                        transaction: t, // pass transaction object to query
                    }
                );
                const address = await Addresses.findOne({
                    where: {
                        AWB: AWB
                    }
                });
                if (!address) {
                    return {
                        success: false,
                        message: 'Shipment not found'
                    };
                }
                if (streetName || aptNumber || floorNumber || buildNumber || cityID || postalCode) {
                    if (address) {
                        await Addresses.update({ isActive: false }, {
                            where: {
                                AWB: AWB
                            }, transaction: t
                        });

                        await Addresses.create({
                            AWB: AWB,
                            streetName: streetName,
                            apartmentNumber: aptNumber,
                            floorNumber: floorNumber,
                            buildingNumber: buildNumber,
                            cityID: cityID,
                            postalCode: postalCode,
                            cneeContactPersonID: address?.cneeContactPersonID,
                        }, {
                            where: {
                                AWB: AWB
                            }, transaction: t
                        });
                    }
                }
                if (contactNumber) {
                    if (contactNumber.length > 0) {
                        for (let i = 0; i < contactNumber.length; i++) {
                            await ContactNumbers.create({
                                AWB: AWB,
                                cneeContactPersonID: address?.cneeContactPersonID,
                                contactNumber: contactNumber[i],
                                numberTypeID: 1,
                            }, { transaction: t });
                        }
                    }
                }
                if (appointment) {
                    await Transactions.update({
                        userID: userID,
                        expectedDeliveryDate: appointment
                    }, {
                        where: {
                            AWB: AWB
                        }, transaction: t
                    });
                }
                return {
                    success: true,
                    message: 'Shipment details updated successfully'
                };
            });
            await t.commit();
            return result;
        } catch (error) {
            console.log(error);

            await t.rollback(); // Rollback the transaction if any error occurs
            return {
                success: false,
                message: 'Error updating shipment details'
            };
        }
    }
}