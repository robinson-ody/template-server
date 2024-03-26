import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { EnvMissingError } from '../../../errors/env-missing';
import { NotAuthorizedError } from '../../../errors/not-authorized';
import { NotFoundError } from '../../../errors/not-found';
import { User } from '../../../models/user';

const get_current_user_controller: RequestHandler = async (req, res) => {
  const current_user = req.current_user;
  if (!current_user) throw new NotAuthorizedError();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new NotAuthorizedError();

  const jwt_key = process.env.JWT_KEY;
  if (!jwt_key) throw new EnvMissingError('JWT_KEY');

  const decoded = jwt.verify(token, jwt_key);
  if (!decoded) throw new NotAuthorizedError();

  const user = await User.findById(current_user.user_id);
  if (!user) throw new NotFoundError(`User not found`);

  res.status(200).json({
    message: `Get current user success`,
    data: user,
  });
};

export { get_current_user_controller };
