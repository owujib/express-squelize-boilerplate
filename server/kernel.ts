import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';

import ApiError from './utils/ApiError';
import HttpStatusCode from './helpers/HttpsResponse';
import TestController from './api/controllers/TestController';

import { uploadHelper } from './decorators/FileHandler';

import db from './models';
import logger from './utils/logger';
import AuthController from './api/controllers/AuthController/auth.controller';
import fileConfig from './config/fileConfig';
import Helper from './helpers';
import globalErrorHandler from './helpers/globalErrorHandler';
process.env.TZ = 'Africa/Lagos';

class Kernel {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.webhooks();

    this.mapControllersToRoutes([TestController, AuthController]);
    this.errorHandler();
    this.databaseConnection();

    if (fileConfig.default === 'local') {
      const dir = <string>process.env.UPLOADS_DIR!;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
  }

  middlewares() {
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.set('PORT', process.env.PORT || 5500);
    this.app.set('NODE_ENV', process.env.NODE_ENV);

    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  webhooks() {}

  routes() {
    this.app.get('/', (req, res, next) =>
      res.status(200).json({
        nessage: 'hello',
      }),
    );

    this.app.post(
      '/upload',
      uploadHelper({
        fields: [{ name: 'image', maxCount: 1 }],
        validationFunction: Helper.requestFileValidation([
          'image/jpeg',
          'image/png',
        ]),
        limit: null,
      }),
      (req, res, next) => {
        return res
          .status(200)
          .json({ files: (<any>req).files.image[0], file: req.file });
      },
    );
  }

  errorHandler() {
    /**404 routes */
    this.app.all('*', (req, res, next) => {
      return next(
        new ApiError('Route not found', HttpStatusCode.HTTP_NOT_FOUND, {
          message:
            'The route you are looking for has been moved or does not exist',
        }),
      );
    });

    /**global error handler */
    this.app.use(globalErrorHandler);
  }

  databaseConnection() {
    (async function () {
      try {
        await db.sequelize.authenticate();
        logger.info('Database Module Connected');
      } catch (error) {
        logger.error('Database connection error: ', error);
      }
    })();
  }

  mapControllersToRoutes(controllers: any[]) {
    return controllers.map((controller) => {
      const basePath = Reflect.getMetadata('basePath', controller);
      const routes = Reflect.getMetadata('routes', controller.prototype) || [];

      return routes.map(
        ({
          path,
          method,
          key,
        }: {
          path: string;
          method: string;
          key: string;
        }) => {
          logger.info(
            `[${method.toUpperCase()}] ${basePath}${path} to ${key} on ${
              controller.name
            }`,
          );

          return (this.app as any)[method](
            `${basePath}${path}`,
            controller.prototype[key],
          );
        },
      );
    });
  }
}

export default new Kernel().app;
