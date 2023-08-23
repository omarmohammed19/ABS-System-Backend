import { RolesModel } from '../../../Backend/sys_Roles/Model';
import { sequelize } from '../../../Config/database';
import Sequelize from 'sequelize';

export class AddMembersController {

  // async getRoles(language: string, roleTypeID: number): Promise<RolesModel[]> {
  //   try {
  //     return await sequelize.transaction(async (t) => {
  //       const query = 'EXEC [dbo].[p_GET_Roles] @language = :language, @roleTypeID = :roleTypeID';
  //       const replacements = { language: language, roleTypeID: roleTypeID };
  //       const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  //       const result = await sequelize.query(query, options);
  //       return result as unknown as RolesModel[];
  //     });
  //   }

  //   catch (err) {
  //     throw new Error(`Could not get all Roles. Error: ${err}`);
  //   }
  // }
}