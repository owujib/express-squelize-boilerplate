import { Response, Request, NextFunction } from 'express';
import BaseController from '.';

import Helper from '../../helpers';
import { uploadFileHandler } from '../../decorators/FileHandler';
import { Controller, Get, Post } from '../../decorators';
import logger from '../../utils/logger';
import FileUploadService from '../../services/FileUploadService';
import AWSStorageProvider from '../../services/FileUploadService/AwsStorageProvider';

@Controller('/api/test')
class TestController extends BaseController {
  constructor() {
    super();
  }

  @Get('/')
  async getIndex(req: any, res: any) {
    res.send('Hello, Express with Decorators! kknd');
  }

  @Post('/file')
  @uploadFileHandler({
    validationFunction: Helper.requestFileValidation([
      'image/jpeg',
      'image/png',
      'application/pdf',
    ]),
    limit: Helper.convertToBytes(2),
  })
  async doFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files) && req.files.length > 0) {
        const file = req.files;
        let file_key = `uploads/${Date.now().toString()}-${file[0]?.originalname?.replace(
          ' ',
          '-',
        )}`;

        let upload = await new FileUploadService().uploadFile(
          file[0],
          'image',
          file_key,
        );
        return super.sendSuccessResponse(res, { upload, file_key }, '', 200);
      }
      return super.sendSuccessResponse(
        res,
        { ...req.files },
        'testing files',
        200,
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default TestController;
