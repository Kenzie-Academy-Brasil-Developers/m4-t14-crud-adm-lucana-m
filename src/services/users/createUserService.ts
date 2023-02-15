import {
  IUserRequest,
  IUserResult,
  UserOmitPassword,
} from "../../interfaces/usersInterface";
import format from "pg-format";
import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../../errors";

export const createUserService = async (
  requestData: IUserRequest
): Promise<UserOmitPassword> => {
  let template: string = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: template,
    values: [requestData.email],
  };

  const queryResultEmail: QueryResult = await client.query(queryConfig);

  if (queryResultEmail.rowCount > 0) {
    throw new AppError("User already exists", 409);
  }

  template = format(
    `
      INSERT INTO users (%I)
      VALUES (%L)
      RETURNING id, name, email, admin, active
    `,
    Object.keys(requestData),
    Object.values(requestData)
  );

  const queryResult: IUserResult = await client.query(template);

  return queryResult.rows[0];
};
