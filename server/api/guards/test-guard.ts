import { Request, Response, NextFunction } from 'express';
import HttpStatusCode from '../../helpers/HttpsResponse';
import ApiError from '../../utils/ApiError';

export class TestGuard {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const user = true;
    console.log('hey hey hey don not play with me ');
    if (user) {
      // User is authenticated, allow the request to proceed
      return next();
    } else {
      // User is not authenticated, send a 401 Unauthorized response
      return next(
        new ApiError('Unauthorized', HttpStatusCode.HTTP_UNAUTHORIZED, {
          message: 'User not authenticated',
        }),
      );
    }
  }
}
// export default new TestGuard();
