import { genSalt, hash } from 'bcrypt';
import { RequestHandler } from 'express';
import { param } from 'express-validator';
import { NotAuthorizedError } from '../../../errors/not-authorized';
import { NotFoundError } from '../../../errors/not-found';
import { User } from '../../../models/user';

const validator = [param('user_id').isMongoId().withMessage('Invalid user_id')];

const controller: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.user_id);
  if (!user) throw new NotFoundError(`User not found`);

  const current_user = req.current_user;
  if (!current_user) throw new NotAuthorizedError();

  user.password = await hash(user.username, await genSalt(12));
  await user.save();

  res.status(200).json({
    message: `Password user ${user.username} berhasil direset`,
    data: { user },
  });
};

export {
  controller as reset_user_password_controller_v1,
  validator as reset_user_password_validator_v1
};

