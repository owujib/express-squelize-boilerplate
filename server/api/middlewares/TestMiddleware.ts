import { Response, Request, NextFunction } from 'express';
class MiddleWare {
  verify(req: Request, res: Response, next: NextFunction) {
    return next();
  }

  test(req: Request, res: Response, next: NextFunction) {
    console.log('Hey testing middleware');

    return next();
  }
}
export default new MiddleWare();
