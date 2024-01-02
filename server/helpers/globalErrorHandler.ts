import { NextFunction, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import ApiError from '../utils/ApiError';
import HttpResponseCode from './HttpsResponse';
import logger from '../utils/logger';

dotenv.config({ path: path.resolve('.env') });

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ApiError(message, HttpResponseCode.HTTP_BAD_REQUEST, {
    message: errors,
  });
};

const sendErrorDev = (err: ApiError, req: Request, res: Response) => {
  /** send all error to log file on dev env */

  // A) API routes error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      err,
      message: err.message,
      error: err.error,
      stack: err.stack,
    });
  }

  //errors not found in the api route
  return res.send('<h1>Check Development console</h1>');
};

const sendErrorProd = (err: ApiError, req: Request, res: Response) => {
  /** check errors in API routes  */
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err.error,
      });
    }

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong! please contact support',
    });
  }

  return res
    .status(HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR)
    .json({ message: 'unexpected server error' });
};

const globalErrorHandler = async (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode =
    err.statusCode || HttpResponseCode.HTTP_INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  logger.error(
    JSON.stringify({
      url: `${req.method} ${req.originalUrl}`,
      message: err.message,
      error: err.error,
      stack: err.stack,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    return sendErrorDev(err, req, res);
  }

  let error: ApiError = {
    ...err,
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err.error,
  };

  if (err.message === 'Request Validation Error') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err.error,
    });
  }

  if (error.name === 'SequelizeValidationError') {
    error = handleValidationErrorDB(error);
  }

  return sendErrorProd(error, req, res);
};

export default globalErrorHandler;
