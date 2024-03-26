import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  status_code = 404;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize_error() {
    return { message: this.message };
  }
}

export { NotFoundError };
