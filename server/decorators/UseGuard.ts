// import { RequestHandler } from 'express';

// export function UseGuard(guard: RequestHandler | RequestHandler[]) {
//   return function (
//     target: any,
//     propertyKey?: string,
//     descriptor?: PropertyDescriptor,
//   ) {
//     if (propertyKey) {
//       if (!target.guards) {
//         target.guards = {};
//       }

//       if (!target.guards[propertyKey]) {
//         target.guards[propertyKey] = [];
//       }

//       target.guards[propertyKey].push(
//         ...(Array.isArray(guard) ? guard : [guard]),
//       );
//     } else {
//       if (!target.prototype.guards) {
//         target.prototype.guards = [];
//       }

//       if (!target.prototype.guards) {
//         target.prototype.guards = [];
//       }

//       target.prototype.guards.push(...(Array.isArray(guard) ? guard : [guard]));
//     }
//   };
// }

export function UseGuard(guards: any | any[]) {
  return function (
    target: any,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) {
    // Check if it's a static method (class constructor)
    if (propertyKey === undefined) {
      if (!target.guards) {
        target.guards = [];
      }

      target.guards.push(...(Array.isArray(guards) ? guards : [guards]));
    } else {
      // It's a prototype method
      if (!target.guards) {
        target.guards = {};
      }

      if (!target.guards[propertyKey]) {
        target.guards[propertyKey] = [];
      }

      target.guards[propertyKey].push(
        ...(Array.isArray(guards) ? guards : [guards]),
      );
    }
  };
}
