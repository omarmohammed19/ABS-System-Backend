import { DisplayedStatusModel, displayedStatus } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByID = async (ID: number, language: string, t: Transaction) => {
    const query = 'EXEC [dbo].[p_GET_ship_Status] @language = :language , @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = await sequelize.query(query, options);
    return result as unknown as DisplayedStatusModel;
};

export class DisplayedStatusController {
    async index(language: string): Promise<DisplayedStatusModel[]> {
        try {
            const query = 'EXEC [dbo].[p_GET_cust_DisplayedStatus] @language = :language , @Method = :Method';
            const replacements = { language: language, Method: 'GET' };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as DisplayedStatusModel[];
        } catch (err) {
            throw new Error(`Could not get all Status. Error: ${err}`);
        }
    }

    async create(status: DisplayedStatusModel): Promise<DisplayedStatusModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                const result = await displayedStatus.create(
                    {
                        enDisplayedStatus: status.enDisplayedStatus,
                        arDisplayedStatus: status.arDisplayedStatus,
                        Notes: status.Notes,
                    },
                    { transaction: t } // pass transaction object to query
                );
                return result ? result.toJSON() : 'Could not add new Status';
            });
        } catch (err) {
            throw new Error(`Could not add new Status. Error: ${err}`);
        }
    }

    async getPrevStatusByID(ID: number, language: string): Promise<DisplayedStatusModel | string> {
        try {
            const result = await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                const item = await getByID(ID, language, t); // pass transaction object to getById function
                return item;
            });
            return result;
        } catch (err) {
            throw new Error(`Could not get Status by ID. Error: ${err}`);
        }
    }

    async update(language: string, status: DisplayedStatusModel): Promise<DisplayedStatusModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                // start managed transaction and pass transaction object to the callback function
                await displayedStatus.update(
                    {
                        enDisplayedStatus: status.enDisplayedStatus,
                        arDisplayedStatus: status.arDisplayedStatus,
                        Notes: status.Notes,
                    },
                    {
                        where: {
                            ID: status.ID,
                        },
                        transaction: t, // pass transaction object to query
                    }
                );
                const result = await getByID(status.ID, language, t);
                return result;
            });
        } catch (err) {
            throw new Error(`Could not update Status. Error: ${err}`);
        }
    }

    async deactivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<DisplayedStatusModel>(displayedStatus, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Status. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<DisplayedStatusModel>(displayedStatus, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Status. Error: ${err}`);
        }
    }
}
