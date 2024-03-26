import { CustomError } from './custom-error';

class BadRequestError extends CustomError {
  status_code = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize_error() {
    return { message: this.message };
  }
}

export { BadRequestError };
