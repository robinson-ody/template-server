import { RequestHandler } from 'express';
import { param } from 'express-validator';
import { User } from '../../../models/user';

const validator = [param('user_id').isMongoId().withMessage('Invalid user_id')];

const controller: RequestHandler = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  res.status(200).json({ message: `Get user success`, data: user });
};

export {
  controller as get_user_by_id_controller_v1,
  validator as get_user_by_id_validator_v1,
};
