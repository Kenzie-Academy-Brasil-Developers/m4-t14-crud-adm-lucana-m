import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  UserOmitPassword,
  IUserResult,
  returnUpdatedUser,
} from "../../interfaces/usersInterface";
import { returnWithoutPassword } from "../../schemas/userSchemas";

export const updateUserService = async (
  id: string,
  userData: returnUpdatedUser
): Promise<UserOmitPassword> => {
  const userKeys = Object.keys(userData);
  const userValues = Object.values(userData);

  const template: string = format(
    `
        UPDATE users
        SET(%I) = ROW(%L)
        WHERE id = $1
        RETURNING id, name, email, admin, active;
        `,
    userKeys,
    userValues
  );

  const queryConfig: QueryConfig = {
    text: template,
    values: [id],
  };

  const queryResult: IUserResult = await client.query(queryConfig);
  const updatedUser = returnWithoutPassword.parse(queryResult.rows[0]);

  return updatedUser;
};
