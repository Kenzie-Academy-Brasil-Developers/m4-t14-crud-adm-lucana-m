import { QueryConfig } from "pg";
import { UserOmitPassword, IUserResult } from "../../interfaces/usersInterface";
import { client } from "../../database";
import { returnWithoutPassword } from "../../schemas/userSchemas";

export const userProfileService = async (
  id: number
): Promise<UserOmitPassword> => {
  const template: string = `
        SELECT *
        FROM users
        WHERE id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: template,
    values: [id],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const userProfile = returnWithoutPassword.parse(queryResult.rows[0]);

  return userProfile;
};
