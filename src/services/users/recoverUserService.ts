import { QueryConfig } from "pg";
import { UserOmitPassword, IUserResult } from "../../interfaces/usersInterface";
import { client } from "../../database";
import { AppError } from "../../errors";
import { returnWithoutPassword } from "../../schemas/userSchemas";

export const recoverUserService = async (
  id: string
): Promise<UserOmitPassword> => {
  const templateVerifyActive: string = `
        SELECT *
        FROM users
        WHERE id = $1;
    `;

  const queryConfigVerifyActive: QueryConfig = {
    text: templateVerifyActive,
    values: [id],
  };

  const result: IUserResult = await client.query(queryConfigVerifyActive);

  if (result.rows[0].active === true) {
    throw new AppError("User already active");
  }

  const templateReactiveUser: string = `
        UPDATE users
        SET "active" = true
        WHERE id = $1
        RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: templateReactiveUser,
    values: [id],
  };

  const queryResult: IUserResult = await client.query(queryConfig);
  const reactivatedUser = returnWithoutPassword.parse(queryResult.rows[0]);

  return reactivatedUser;
};
