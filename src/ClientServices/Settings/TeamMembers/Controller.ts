import { sequelize } from '../../../Config/database';
import Sequelize from 'sequelize';


export class TeamMembersController {
  async getTeamMembers(language: string, mainAccountID: number, ID: number): Promise<any[]> {
    try {
      const query = 'EXEC [dbo].[p_GET_sys_Users] @language = :language, @Method = :Method, @mainAccountID = :mainAccountID, @ID= :ID';
      const replacements = { language: language, Method: 'GET_TeamMembers', mainAccountID: mainAccountID, ID: ID };
      const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
      const result = sequelize.query(query, options);
      return result as unknown as any[];
    } catch (err) {
      throw new Error(`Could not get team members. Error: ${err}`);
    }
  }
}