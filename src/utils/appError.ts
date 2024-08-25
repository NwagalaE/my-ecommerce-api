import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const appError = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error stack trace
  console.error(err.stack);

  // If the error is operational, send a response with the provided status code
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // If the error is not operational, it might be a programming error or an unknown error
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export { AppError };
export default appError;