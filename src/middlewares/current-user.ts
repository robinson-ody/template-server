import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../constants/user-role';
import { EnvMissingError } from '../errors/env-missing';

interface UserPayload extends JwtPayload {
  user_id: string;
  username: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      current_user?: UserPayload;
    }
  }
}

const current_user = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return;

    const jwt_key = process.env.JWT_KEY;
    if (!jwt_key) throw new EnvMissingError('JWT_KEY');

    req.current_user = jwt.verify(
      req.headers.authorization.split(' ')[1],
      jwt_key
    ) as UserPayload;
  } catch (error) {
  } finally {
    next();
  }
};

export { current_user, UserPayload };
