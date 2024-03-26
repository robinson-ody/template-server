import { genSalt, hash } from 'bcrypt';
import { randomLightChalk } from 'ody-utils';
import { UserRole } from '../../constants/user-role';
import { EnvMissingError } from '../../errors/env-missing';
import { User } from '../../models/user';

const initiate_super_admin = async () => {
  const existing_super_admin = await User.findOne({
    role: UserRole.SUPER_ADMIN,
  });

  if (existing_super_admin) {
    if (process.env.NODE_ENV !== 'test') {
      randomLightChalk(`✅ super admin already exists`);
    }

    return;
  }

  const super_admin_password = process.env.SUPER_ADMIN_PASSWORD;
  if (!super_admin_password) throw new EnvMissingError('SUPER_ADMIN_PASSWORD');

  const super_admin_hashed_password = await hash(
    super_admin_password,
    await genSalt(12)
  );

  const super_admin_username = process.env.SUPER_ADMIN_USERNAME;
  if (!super_admin_username) throw new EnvMissingError('SUPER_ADMIN_USERNAME');

  const new_super_admin = User.build({
    password: super_admin_hashed_password,
    role: UserRole.SUPER_ADMIN,
    username: super_admin_username,
  });

  await new_super_admin.save();

  if (process.env.NODE_ENV !== 'test') {
    randomLightChalk(
      `✅ created super admin with username: ${new_super_admin.username}`
    );
  }
};

export { initiate_super_admin };
