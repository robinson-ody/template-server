import { genSalt, hash } from 'bcrypt';
import { RequestHandler } from 'express';
import { body } from 'express-validator';
import { UserRole } from '../../../constants/user-role';
import { User } from '../../../models/user';

const validator = [
  body('username')
    .notEmpty()
    .withMessage(`Username cannot be empty`)
    .custom(async username => {
      const existing_user = await User.findOne({ username });
      return existing_user;
    })
    .withMessage(`Username already taken`),
];

const controller: RequestHandler = async (req, res) => {
  const { username } = req.body;

  const hashed_password = await hash(username, await genSalt(12));

  const new_user = User.build({
    password: hashed_password,
    username,
    role: UserRole.ADMIN,
  });

  await new_user.save();

  res.status(201).json({
    message: `User berhasil dibuat`,
    data: { new_user },
  });
};

export {
  controller as create_user_controller_v1,
  validator as create_user_validator_v1,
};
