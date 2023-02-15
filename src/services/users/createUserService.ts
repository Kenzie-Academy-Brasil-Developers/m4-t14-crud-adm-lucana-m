import {
  IUserRequest,
  IUserResult,
  UserOmitPassword,
} from "../../interfaces/usersInterface";
import format from "pg-format";
import { client } from "../../database";

export const createUserService = async (
  requestData: IUserRequest
): Promise<UserOmitPassword> => {
  const template: string = format(
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
