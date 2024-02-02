import { Response, Request, NextFunction } from 'express';
import RouteController from '..';

import HttpStatusCode from '../../../helpers/HttpsResponse';
import Validator from '../../../helpers/Validator';
import Joi from 'joi';

import db from '../../../models';
import ApiError from '../../../utils/ApiError';
import AuthMail from '../../../mail/Authmail';

import {
  Controller,
  Post,
  Get,
  UseMiddleware,
  UseGuard,
} from '../../../decorators';
import { signUpDto } from './dto';
import TestMiddleware from '../../middlewares/TestMiddleware';
import { TestGuard } from '../../guards/test-guard';

@Controller('/api/auth')
@UseMiddleware(TestMiddleware.test)
@UseGuard(TestGuard)
class AuthController extends RouteController {
  constructor() {
    super();
  }

  @Post('/register')
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = signUpDto.validate(req.body);
      if (error) {
        throw Validator.RequestValidationError(error.message);
      }

      const userExist = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (userExist) {
        throw new ApiError(
          'A user with the given email already exists',
          HttpStatusCode.HTTP_BAD_REQUEST,
          {
            message: 'Account exists',
          },
        );
      }
      // const user = await db.User.create({
      //   ...req.body,
      //   password: Helper.hash(req.body.password, 10),
      // });
      // await new AuthMail(user).sendWelcome({ title: 'welcome' });
      return super.sendSuccessResponse(
        res,
        {},
        'Account has been created',
        HttpStatusCode.HTTP_CREATED,
      );
    } catch (error) {
      return next(error);
    }
  }

  @Post('/login')
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      return super.sendSuccessResponse(
        res,
        {},
        'Login successfull',
        HttpStatusCode.HTTP_OK,
      );
    } catch (error) {
      return next(error);
    }
  }

  @Get('/google')
  @UseMiddleware([TestMiddleware.test])
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        message: 'google route is working',
      });
    } catch (error) {
      throw error;
    }
  }
}

export default AuthController;
