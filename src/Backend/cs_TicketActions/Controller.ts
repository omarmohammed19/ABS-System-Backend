import { TicketActionsModel, TicketActions } from './Model';
import { De_Activate } from '../../Services/De_Activate';
import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';
import { Tickets } from '../cs_Tickets/Model';

const getById = (ID: number, t: Transaction, language?: string) => {
    const query = 'EXEC [dbo].[p_GET_cs_TicketActions] @language = :language, @Method = :Method, @ID = :ID';
    const replacements = { language: language, Method: 'GET_ByID', ID: ID };
    const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
    const result = sequelize.query(query, options);
    return result as unknown as TicketActionsModel;
};

export class TicketActionsController {
    async index(language: string): Promise<TicketActionsModel[]> {
        try {
            const query =
                'EXEC [dbo].[p_GET_cs_TicketActions] @language = :language, @Method = :Method';
            const replacements = { language: language, Method: 'GET' };
            const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT };
            const result = await sequelize.query(query, options);
            return result as unknown as TicketActionsModel[];
        } catch (err) {
            throw new Error(`Could not get all Ticket Actions. Error: ${err}`);
        }
    }

    async create(ticketAction: TicketActionsModel): Promise<TicketActionsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = await TicketActions.create(
                    {
                        ticketID: ticketAction.ticketID,
                        ticketStatusID: ticketAction.ticketStatusID,
                        userID: ticketAction.userID,
                        actionDate: ticketAction.actionDate,
                        assignedDepartmentID: ticketAction.assignedDepartmentID,
                        assignedCustomerServiceID: ticketAction.assignedCustomerServiceID,
                        Notes: ticketAction.Notes,
                    },
                    { transaction: t }
                );

                return result;
            });
        } catch (err) {
            throw new Error(`Could not add new Ticket Action. Error: ${err}`);
        }
    }

    async getTicketActionByID(ID: number, language: string): Promise<TicketActionsModel> {
        try {
            return await sequelize.transaction(async (t) => {
                const result = getById(ID, t, language);
                return result;
            });
        } catch (err) {
            console.log(err);

            throw new Error(`Could not get Ticket Action by ID. Error: ${err}`);
        }
    }

    async assignTicket(ticketAction: TicketActionsModel): Promise<string> {
        try {
            return await sequelize.transaction(async (t) => {
                console.log(ticketAction);

                try {
                    await Tickets.update(
                        {
                            ticketStatusID: ticketAction.ticketStatusID,
                            lastActionDate: ticketAction.actionDate,
                            assignedDepartmentID: ticketAction.assignedDepartmentID,
                            assignedCustomerServiceID: ticketAction.assignedCustomerServiceID,
                            isClosed: ticketAction.ticketStatusID == 8 ? true : false,
                            userID: ticketAction.userID,
                        },
                        {
                            where: {
                                ID: ticketAction.ticketID,
                            },
                            transaction: t,
                        }
                    );
                } catch (err) {
                    console.log(err);

                    throw new Error(`Could not update Ticket. Error: ${err}`);
                }


                await TicketActions.create(
                    {
                        ticketID: ticketAction.ticketID,
                        ticketStatusID: ticketAction.ticketStatusID,
                        userID: ticketAction.userID,
                        actionDate: ticketAction.actionDate,
                        assignedDepartmentID: ticketAction.assignedDepartmentID,
                        assignedCustomerServiceID: ticketAction.assignedCustomerServiceID,
                        Notes: ticketAction.Notes,
                    },
                    { transaction: t }
                );
                return 'Ticket Assigned Successfully';
            });
        } catch (err) {
            throw new Error(`Could not assign Ticket. Error: ${err}`);
        }
    }

    async update(ticketAction: TicketActionsModel, language: string): Promise<TicketActionsModel | string> {
        try {
            return await sequelize.transaction(async (t) => {
                await TicketActions.update(
                    {
                        ticketID: ticketAction.ticketID,
                        ticketStatusID: ticketAction.ticketStatusID,
                        userID: ticketAction.userID,
                        actionDate: ticketAction.actionDate,
                        assignedDepartmentID: ticketAction.assignedDepartmentID,
                        assignedCustomerServiceID: ticketAction.assignedCustomerServiceID,
                        Notes: ticketAction.Notes,
                        isActive: ticketAction.isActive,
                    },
                    {
                        where: {
                            ID: ticketAction.ID,
                        },
                        transaction: t,
                    }
                );
                const updatedTicketAction = getById(ticketAction.ID, t, language);
                return updatedTicketAction;
            });
        } catch (err) {
            throw new Error(`Could not update Ticket Action. Error: ${err}`);
        }
    }

    async deActivate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketActionsModel>(TicketActions, 'ID', ID, 'deactivate');
            return result;
        } catch (err) {
            throw new Error(`Could not deactivate Ticket Action. Error: ${err}`);
        }
    }

    async activate(ID: number): Promise<string> {
        try {
            const result = await De_Activate<TicketActionsModel>(TicketActions, 'ID', ID, 'activate');
            return result;
        } catch (err) {
            throw new Error(`Could not activate Ticket Action. Error: ${err}`);
        }
    }
}
