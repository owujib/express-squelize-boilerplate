import { Response, Request, NextFunction } from 'express';
class MiddleWare {
  verify(req: Request, res: Response, next: NextFunction) {
    return next();
  }
}
export default new MiddleWare();
