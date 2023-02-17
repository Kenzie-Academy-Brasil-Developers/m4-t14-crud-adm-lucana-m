import { allUsersReturn } from "../../interfaces/usersInterface";
import { client } from "../../database";

export const listUsersService = async (): Promise<allUsersReturn> => {
  const template: string = `
        SELECT id, name, email, admin, active
        FROM users;
    `;

  const queryResult = await client.query(template);

  return queryResult.rows;
};
