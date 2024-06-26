import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request';

const validate_request = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array()[0].msg);
  }

  next();
};

export { validate_request };
