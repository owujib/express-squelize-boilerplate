import { NextFunction, Request, Response, Express } from 'express';
import multer, { Multer } from 'multer';
import ApiError from '../utils/ApiError';
import { HttpStatusCode } from 'axios';
import Helper from '../helpers';
import { uploadHandlerType } from '../types';
import fileConfig from '../config/fileConfig';

let storage = multer.memoryStorage();

export function uploadFileHandler({
  fields,
  validationFunction,
  limit,
}: uploadHandlerType) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const upload = multer({
      storage: storage,
      fileFilter: validationFunction,
      limits: {
        fileSize: limit || Helper.convertToBytes(2),
      },
    });
    const originalMethod = descriptor.value;
    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      upload.any()(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          throw new ApiError(
            'Request File Error',
            HttpStatusCode.BadRequest,
            err,
          );
        } else if (err) {
          throw new ApiError('Server error', HttpStatusCode.BadRequest, err);
        }

        return originalMethod.call(this, req, res, next);
      });
    };
  };
}

export const uploadHelper = ({
  validationFunction,
  fields,
  limit,
}: uploadHandlerType) => {
  const upload = multer({
    storage: storage,
    fileFilter: validationFunction,
    limits: {
      fileSize: limit || Helper.convertToBytes(2),
    },
  });

  return upload.fields(fields);
};
