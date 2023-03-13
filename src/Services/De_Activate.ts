import { sequelize } from '../Config/database';


export const De_Activate = async <T extends { isActive: boolean }>(
  Model: any,
  columnName: string,
  columnValue: string | Number,
  type: string
): Promise<string> => {
  let result: string = '';

  try {
    await sequelize.transaction(async (t) => {
      // start managed transaction and pass transaction object to the callback function
      const object = (await Model.findOne({
        attributes: ['isActive'],
        where: {
          [columnName]: columnValue,
        },
        transaction: t, // pass transaction object to query
      })) as T | null;

      if (object == null) {
        result = `${columnName} is not found`;
      } else if (type == 'activate') {
        if (object.isActive == true) {
          result = 'Already Activated';
        } else {
          const updateResult = await Model.update(
            {
              isActive: true,
            },
            {
              where: {
                [columnName]: columnValue,
              },
              transaction: t, // pass transaction object to query
            }
          );
          result = updateResult
            ? `${Model.name} record with ${columnName} ${columnValue} is activated successfully`
            : `Could not activate ${Model.name} record`;
        }
      } else if (type == 'deactivate') {
        if (object.isActive == false) {
          result = 'Already Deactivated';
        } else {
          const updateResult = await Model.update(
            {
              isActive: false,
            },
            {
              where: {
                [columnName]: columnValue,
              },
              transaction: t, // pass transaction object to query
            }
          );
          result = updateResult
            ? `${Model.name} record with ${columnName} ${columnValue} is deactivated successfully`
            : `Could not deactivate ${Model.name} record`;
        }
      }
    });
  } catch (err) {
    throw new Error(`Could not update ${Model.name}. Error: ${err}`);
  }

  return result;
};
