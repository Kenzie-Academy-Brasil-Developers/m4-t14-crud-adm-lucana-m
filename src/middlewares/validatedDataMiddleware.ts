import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validatedDataMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const verifyContainsAdmin = Object.keys(request.body).includes("admin");
    let newRequestData = request.body;

    if (!verifyContainsAdmin) {
      newRequestData.admin = false;
    }

    const validatedData = schema.parse(newRequestData);

    request.body = validatedData;

    return next();
  };
