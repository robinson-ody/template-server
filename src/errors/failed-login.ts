import { CustomError } from './custom-error';

class FailedLoginError extends CustomError {
  status_code = 400;

  constructor() {
    super('Login failed!');
    Object.setPrototypeOf(this, FailedLoginError.prototype);
  }

  serialize_error() {
    return { message: this.message };
  }
}

export { FailedLoginError };
