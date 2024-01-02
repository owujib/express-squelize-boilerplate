import jwt from 'jsonwebtoken';
import crypto from 'crypto-js';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import path from 'path';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import bcrypt from 'bcryptjs';

import HttpStatusCode from './HttpsResponse';
import ApiError from '../utils/ApiError';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
export default class Helper {
  static cloudinaryImageUploadMethod = async (
    filePath: string,
    resource_type: 'image' | 'video' | 'raw' | 'auto',
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> =>
    cloudinary.uploader.upload(filePath, { resource_type, folder });

  static cloudinaryResourceUploadMethod = async (
    filePath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> =>
    cloudinary.uploader.upload(filePath, { resource_type: 'auto' });

  static cloudinaryRemoveImageMethod = async (
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> =>
    cloudinary.uploader.destroy(publicId, { resource_type: 'image' });

  static cloudinaryRemoveResourceMethod = async (
    publicId: string,
    resource_type: 'image' | 'video' | 'raw' | 'auto',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> =>
    cloudinary.uploader.destroy(publicId, { type: 'upload', resource_type });

  static signToken(payload: any): { token: string } {
    const token = jwt.sign(payload, (<any>process.env).APP_KEY, {
      expiresIn: (<any>process).env.JWT_EXPIRES_IN,
    });
    return { token };
  }

  static veifyToken(payload: any): { token: any } {
    const token = jwt.verify(payload, (<any>process.env).APP_KEY);
    return { token };
  }

  static randomStringGenerator(length: number) {
    let result = '';
    const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const CharactersLength = Characters.length;

    if (length >= 500) {
      length = 500;
    }

    for (let index = 0; index < length; index++) {
      result += Characters.charAt(Math.floor(Math.random() * CharactersLength));
    }
    return result;
  }
  static randomNumberGenerator(length: number) {
    let result = '';
    const Characters = '0123456789';
    const CharactersLength = Characters.length;

    if (length >= 500) {
      length = 500;
    }

    for (let index = 0; index < length; index++) {
      result += Characters.charAt(Math.floor(Math.random() * CharactersLength));
    }
    return result;
  }

  static hash(value: string, saltValue: number) {
    return bcrypt.hashSync(value, saltValue);
  }

  static async correctPassword(inputPassword: string, userPassword: string) {
    return bcrypt.compareSync(inputPassword, userPassword);
  }
  static async comparePin(inputPin: any, userPin: any) {
    return bcrypt.compareSync(inputPin, userPin);
  }

  static addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getPublicId(imageURL: string): string {
    const [, publicIdWithExtensionName] = imageURL.split('upload/');
    const extensionName = path.extname(publicIdWithExtensionName);
    const publicId = publicIdWithExtensionName
      .replace(extensionName, '')
      .split('/')
      .slice(1)
      .join('/');

    return publicId;
  }

  /**
   * @description one byte = 1000000
   * to convert to megabyte times by byte
   * to convert to gigabyte time by 1e9
   */
  static convertToBytes(value: number) {
    const BYTES = 1000000;
    return value * BYTES;
  }

  static generateUniqueFilename(filename: string) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    return `${filename.split('.')[0]}-${uniqueSuffix}${path.extname(filename)}`;
  }

  /**
   * ```markdown
   * `supportedFiles = ['image/jpeg', 'image/png', 'application/pdf'];`
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
   * ```
   */
  static requestFileValidation(supportedFiles: string[]) {
    return (
      _: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ) => {
      if (supportedFiles.includes(file.mimetype)) {
        return callback(null, true);
      } else {
        return callback(
          new ApiError(
            'Unsupported file format',
            HttpStatusCode.HTTP_BAD_REQUEST,
            {},
          ),
        );
      }
    };
  }
}
