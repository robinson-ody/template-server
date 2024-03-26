import { RequestHandler } from 'express';
import { param } from 'express-validator';
import { UserRole } from '../../../constants/user-role';
import { BadRequestError } from '../../../errors/bad-request';
import { NotAuthorizedError } from '../../../errors/not-authorized';
import { NotFoundError } from '../../../errors/not-found';
import { User } from '../../../models/user';

const validator = [
  param('user_id').isMongoId().withMessage(`user_id on params is required`),
];

const controller: RequestHandler = async (req, res) => {
  const current_user = req.current_user;
  if (!current_user) throw new NotAuthorizedError();

  const user_id = req.params.user_id;
  const user = await User.findById(user_id);
  if (!user) throw new NotFoundError(`User not found`);

  if (user_id === current_user.user_id)
    throw new BadRequestError(`You can't delete yourself`);

  if (user.role === UserRole.SUPER_ADMIN)
    throw new BadRequestError(`You can't delete super admin`);

  await user.deleteOne();

  res.status(200).json({
    message: `Delete user success`,
    data: { deleted_user: user },
  });
};

export {
  controller as delete_user_controller_v1,
  validator as delete_user_validator_v1,
};
