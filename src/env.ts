import { EnvMissingError } from './errors/env-missing';

if (!process.env.NODE_ENV) throw new EnvMissingError('NODE_ENV');
if (!process.env.PORT) throw new EnvMissingError('PORT');
if (!process.env.DB_NAME) throw new EnvMissingError('DB_NAME');
if (!process.env.JWT_KEY) throw new EnvMissingError('JWT_KEY');

if (!process.env.SUPER_ADMIN_USERNAME)
  throw new EnvMissingError('SUPER_ADMIN_USERNAME');

if (!process.env.SUPER_ADMIN_PASSWORD)
  throw new EnvMissingError('SUPER_ADMIN_PASSWORD');
