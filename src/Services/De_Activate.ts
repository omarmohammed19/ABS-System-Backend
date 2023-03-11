import { Transaction } from "sequelize";
import { sequelize } from "../Config/database";

// export const De_Activate = async <T extends { isActive: boolean }>(Model: any, ID: Number, type: string, t: Transaction): Promise<string> => {
//     const object = (await Model.findOne({
//         attributes: ['isActive'],
//         where: {
//             ID: ID,
//         }
//     })) as T | null;

//     if (object == null) {
//         return 'ID is not found';
//     }
//     else if (type == 'activate') {
//         if (object.isActive == true) {
//             return 'Already Deactivated';
//         }
//         else {
//             const result = await Model.update(
//                 {
//                     isActive: true,
//                 },
//                 {
//                     where: {
//                         ID: ID,
//                     },
//                 }
//             );
//             return result ? `${Model.name} record with ID ${ID} is activated successfully` : `Could not activate ${Model.name} record`;
//         }
//     }
//     else if (type == 'deactivate') {
//         if (object.isActive == false) {
//             return 'Already Deactivated';
//         }
//         else {
//             const result = await Model.update(
//                 {
//                     isActive: false,
//                 },
//                 {
//                     where: {
//                         ID: ID,
//                     },
//                 }
//             );
//             return result ? `${Model.name} record with ID ${ID} is deactivated successfully` : `Could not deactivate ${Model.name} record`;
//         }
//     }

//     return 'error occured';

// }

export const De_Activate = async <T extends { isActive: boolean }>(Model: any, ID: Number, type: string): Promise<string> => {

    let result: string = '';

    try {
        await sequelize.transaction(async (t) => { // start managed transaction and pass transaction object to the callback function
            const object = (await Model.findOne({
                attributes: ['isActive'],
                where: {
                    ID: ID,
                },
                transaction: t // pass transaction object to query
            })) as T | null;

            if (object == null) {
                result = 'ID is not found';
            }
            else if (type == 'activate') {
                if (object.isActive == true) {
                    result = 'Already Deactivated';
                }
                else {
                    const updateResult = await Model.update(
                        {
                            isActive: true,
                        },
                        {
                            where: {
                                ID: ID,
                            },
                            transaction: t // pass transaction object to query
                        }
                    );
                    result = updateResult ? `${Model.name} record with ID ${ID} is activated successfully` : `Could not activate ${Model.name} record`;
                }
            }
            else if (type == 'deactivate') {
                if (object.isActive == false) {
                    result = 'Already Deactivated';
                }
                else {
                    const updateResult = await Model.update(
                        {
                            isActive: false,
                        },
                        {
                            where: {
                                ID: ID,
                            },
                            transaction: t // pass transaction object to query
                        }
                    );
                    result = updateResult ? `${Model.name} record with ID ${ID} is deactivated successfully` : `Could not deactivate ${Model.name} record`;
                }
            }
        });
    }
    catch (err) {
        throw new Error(`Could not update ${Model.name}. Error: ${err}`);
    }

    return result;
}
