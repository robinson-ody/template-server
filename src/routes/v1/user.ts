import express from 'express';
import {
  change_password_controller_v1,
  change_password_validator_v1,
} from '../../controllers/v1/user/change-password';
import {
  create_user_controller_v1,
  create_user_validator_v1,
} from '../../controllers/v1/user/create';
import { get_current_user_controller } from '../../controllers/v1/user/current';
import {
  delete_user_controller_v1,
  delete_user_validator_v1,
} from '../../controllers/v1/user/delete';
import get_all_users_controller from '../../controllers/v1/user/get-all';
import {
  get_user_by_id_controller_v1,
  get_user_by_id_validator_v1,
} from '../../controllers/v1/user/get-one';
import {
  user_login_controller,
  user_login_validator,
} from '../../controllers/v1/user/login';
import {
  reset_user_password_controller_v1,
  reset_user_password_validator_v1,
} from '../../controllers/v1/user/reset-password';
import { require_auth } from '../../middlewares/require-auth';
import { require_super_admin } from '../../middlewares/require-super-admin';
import { validate_request } from '../../middlewares/validate-request';

const router = express.Router();

router.post(
  '/login',
  user_login_validator,
  validate_request,
  user_login_controller
);

router.post(
  '/',
  require_auth,
  require_super_admin,
  create_user_validator_v1,
  validate_request,
  create_user_controller_v1
);

router.get('/current', require_auth, get_current_user_controller);

router.get(
  '/:user_id',
  require_auth,
  require_super_admin,
  get_user_by_id_validator_v1,
  validate_request,
  get_user_by_id_controller_v1
);

router.get('/', require_super_admin, get_all_users_controller);

router.patch(
  '/reset-password/:user_id',
  require_auth,
  require_super_admin,
  reset_user_password_validator_v1,
  validate_request,
  reset_user_password_controller_v1
);

router.patch(
  '/change-password',
  require_auth,
  change_password_validator_v1,
  validate_request,
  change_password_controller_v1
);

router.delete(
  '/:user_id',
  require_auth,
  require_super_admin,
  delete_user_validator_v1,
  validate_request,
  delete_user_controller_v1
);

export { router as user_router_v1 };
