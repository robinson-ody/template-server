import jwt from 'jsonwebtoken';

import { compare } from 'bcrypt';
import { RequestHandler } from 'express';
import { body } from 'express-validator';
import { randomChalk } from 'ody-utils';
import { FailedLoginError } from '../../../errors/failed-login';
import { UserPayload } from '../../../middlewares/current-user';
import { User } from '../../../models/user';

const failed_login_log = (user_username: string, message: string) => {
  randomChalk(`[ failed login ] ${user_username}: ${message}`);
};

const validator = [
  body('username').notEmpty().withMessage('username on body is required'),
  body('password').notEmpty().withMessage('password on body is required'),
];

const controller: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    failed_login_log(`${username}`, `Username tidak ditemukan!`);
    throw new FailedLoginError();
  }

  const hashed_password = user.password;
  const password_match = await compare(password, hashed_password);

  if (!password_match) {
    failed_login_log(`${username}`, `Password salah!`);
    throw new FailedLoginError();
  }

  const payload: UserPayload = {
    user_id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: '4h' });
  res.json({ message: `Login berhasil`, data: { token } });
};

export {
  controller as user_login_controller,
  validator as user_login_validator,
};
