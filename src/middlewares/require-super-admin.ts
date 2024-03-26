import { RequestHandler } from 'express';
import { UserRole } from '../constants/user-role';
import { ForbiddenError } from '../errors/forbidden';
import { NotAuthorizedError } from '../errors/not-authorized';
import { User } from '../models/user';

const require_super_admin: RequestHandler = async (req, _res, next) => {
  const current_user = req.current_user;
  if (!current_user) throw new NotAuthorizedError();
  const { user_id } = current_user;
  const user = await User.findById(user_id);
  if (!user) throw new NotAuthorizedError();
  if (user.role !== UserRole.SUPER_ADMIN) throw new ForbiddenError();
  next();
};

export { require_super_admin };
