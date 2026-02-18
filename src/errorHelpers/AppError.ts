/* eslint-disable @typescript-eslint/no-unused-vars */
// custom error (build by own)
class AppError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = " ") {
    super(message); // calling to error Error("...")
    this.statusCode = statusCode;
     Object.setPrototypeOf(this, new.target.prototype);
    // if (stack) {
    //   this.stack = stack;
    // } else {
      Error.captureStackTrace(this, this.constructor);
    // }
  }
}

export default AppError;
