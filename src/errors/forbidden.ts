import { CustomError } from './custom-error';

class ForbiddenError extends CustomError {
  status_code = 403;

  constructor(message?: string) {
    super(message || 'Anda tidak memiliki wewenang untuk melakukan ini');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serialize_error() {
    return { message: this.message };
  }
}

export { ForbiddenError };
