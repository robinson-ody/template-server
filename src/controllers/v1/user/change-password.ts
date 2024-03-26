import { compare, genSalt, hash } from 'bcrypt';
import { RequestHandler } from 'express';
import { body } from 'express-validator';
import { NotAuthorizedError } from '../../../errors/not-authorized';
import { NotFoundError } from '../../../errors/not-found';
import { User } from '../../../models/user';

const validator = [
  body('old_password')
    .isString()
    .withMessage(`old_password on body is required`),

  body('new_password')
    .isString()
    .withMessage(`new_password on body is required`),

  body('new_password_confirmation')
    .custom((value, { req }) => value === req.body.new_password)
    .withMessage(`Password baru tidak sama`),
];

const controller: RequestHandler = async (req, res) => {
  const { old_password, new_password } = req.body;

  const current_user = req.current_user;
  if (!current_user) throw new NotAuthorizedError();

  const user = await User.findById(current_user.user_id);
  if (!user) throw new NotFoundError(`Agen tidak ditemukan`);

  const password_match = await compare(old_password, user.password);
  if (!password_match) throw new Error('Password lama salah');

  const same_password = await compare(new_password, user.password);
  if (same_password) throw new Error('Password lama dan baru tidak boleh sama');

  user.password = await hash(new_password, await genSalt(12));
  await user.save();

  res
    .status(200)
    .json({ message: `Berhasil mengubah password`, data: { user } });
};

export {
  controller as change_password_controller_v1,
  validator as change_password_validator_v1,
};
