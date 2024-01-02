import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

export interface validatorFunctionType {
  (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void;
}

export interface uploadHandlerType {
  fields?: any;
  // fields: { name: string; maxCount: number }[];
  validationFunction: any;
  limit: number | null;
}

export type resourceTypes = 'image' | 'video' | 'raw' | 'auto';
