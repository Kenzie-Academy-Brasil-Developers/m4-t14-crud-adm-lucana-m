import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

export const verifyUserExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = request.params.id;

  const template: string = `
        SELECT *
        FROM users
        WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: template,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};
