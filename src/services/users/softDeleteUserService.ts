import { QueryConfig } from "pg";
import { client } from "../../database";

export const softDeleteUserService = async (id: string): Promise<void> => {
  const template: string = `
        UPDATE users
        SET "active" = false
        WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: template,
    values: [id],
  };

  await client.query(queryConfig);
};
