import { QueryConfig } from "pg";
import { UserWithPassword } from "../../interfaces/usersInterface";
import { LoginRequest } from "../../interfaces/loginInterfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async (
  loginData: LoginRequest
): Promise<string> => {
  const template: string = `
        SELECT *
        FROM users
        WHERE email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: template,
    values: [loginData.email],
  };

  const queryResult: UserWithPassword = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password", 401);
  }

  const verifyPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!verifyPassword) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    "TESTE",
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id,
    }
  );

  return token;
};
