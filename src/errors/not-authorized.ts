import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  status_code = 401;

  constructor() {
    super(`Anda perlu login ulang atau sesi Anda telah berakhir`);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize_error() {
    return { message: this.message };
  }
}

export { NotAuthorizedError };
