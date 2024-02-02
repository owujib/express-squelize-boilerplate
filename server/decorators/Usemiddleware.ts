// import { RequestHandler } from 'express';

// export function UseMiddleware(middleware: RequestHandler | RequestHandler[]) {
//   return function (
//     target: any,
//     propertyKey?: string,
//     descriptor?: PropertyDescriptor,
//   ) {
//     // If propertyKey is present, it's a method-level decorator
//     if (propertyKey) {
//       if (!target.middleware) {
//         target.middleware = {};
//       }

//       // Ensure middleware is an array
//       if (!target.middleware[propertyKey]) {
//         target.middleware[propertyKey] = [];
//       }

//       // Push middleware to the array
//       target.middleware[propertyKey].push(
//         ...(Array.isArray(middleware) ? middleware : [middleware]),
//       );
//     } else {
//       // If propertyKey is not present, it's a class-level decorator
//       if (!target.prototype.middleware) {
//         target.prototype.middleware = [];
//       }

//       // Ensure middleware is an array
//       if (!target.prototype.middleware) {
//         target.prototype.middleware = [];
//       }

//       // Push middleware to the array
//       target.prototype.middleware.push(
//         ...(Array.isArray(middleware) ? middleware : [middleware]),
//       );
//     }
//   };
// }

import { RequestHandler } from 'express';

export function UseMiddleware(middleware: RequestHandler | RequestHandler[]) {
  return function (
    target: any,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) {
    // If propertyKey is present, it's a method-level decorator
    if (propertyKey) {
      if (!target.middleware) {
        target.middleware = {};
      }

      // Ensure middleware is an array
      if (!target.middleware[propertyKey]) {
        target.middleware[propertyKey] = [];
      }

      // Push middleware to the array
      target.middleware[propertyKey].push(
        ...(Array.isArray(middleware) ? middleware : [middleware]),
      );
    } else {
      // If propertyKey is not present, it's a class-level decorator
      if (!target.prototype.middleware) {
        target.prototype.middleware = [];
      }

      // Ensure middleware is an array
      if (!Array.isArray(target.prototype.middleware)) {
        target.prototype.middleware = [];
      }

      // Push middleware to the array
      target.prototype.middleware.push(
        ...(Array.isArray(middleware) ? middleware : [middleware]),
      );
    }
  };
}
