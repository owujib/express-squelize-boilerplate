import 'reflect-metadata';

// interface RouteMetadata {
//   path: string;
//   method: string;
//   key: string;
// }

// export const Controller = (basePath: string = ''): ClassDecorator => {
//   return (target: any) => {
//     Reflect.defineMetadata('basePath', basePath, target);
//   };
// };

type ControllerDecorator = (basePath: string) => ClassDecorator;

export const Controller: ControllerDecorator = (basePath: string) => {
  return (target: any) => {
    target.prototype.basePath = basePath;
    return target;
  };
};

// export const GET = (path: string): MethodDecorator => {
//   return (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) => {
//     const routes = [];
//     routes.push({ path, method: 'get', key: key.toString() });

//     Reflect.defineMetadata('routes', routes, target);
//   };
// };

// export const POST = (path: string): MethodDecorator => {
//   return (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) => {
//     const routes = Reflect.getMetadata('routes', target) || [];
//     routes.push({ path, method: 'post', key: key.toString() });
//     Reflect.defineMetadata('routes', routes, target);
//   };
// };

// export const DELETE = (path: string): MethodDecorator => {
//   return (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) => {
//     const routes = Reflect.getMetadata('routes', target) || [];
//     routes.push({ path, method: 'delete', key: key.toString() });
//     Reflect.defineMetadata('routes', routes, target);
//   };
// };

// export const PATCH = (path: string): MethodDecorator => {
//   return (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) => {
//     const routes = Reflect.getMetadata('routes', target) || [];
//     routes.push({ path, method: 'patch', key: key.toString() });
//     Reflect.defineMetadata('routes', routes, target);
//   };
// };

// export const PUT = (path: string): MethodDecorator => {
//   return (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) => {
//     const routes = Reflect.getMetadata('routes', target) || [];
//     routes.push({ path, method: 'put', key: key.toString() });
//     Reflect.defineMetadata('routes', routes, target);
//   };
// };

type RouteHandler = (req: any, res: any, next?: any) => any;

function createRouteDecorator(method: string) {
  return (path: string): MethodDecorator => {
    return (
      target: any,
      key: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      const routes = target.routes || [];
      routes.push({ path, method, key: key.toString() });
      target.routes = routes;

      return descriptor;
    };
  };
}

export const Get = createRouteDecorator('GET');
export const Post = createRouteDecorator('POST');
export const Put = createRouteDecorator('PUT');
export const Patch = createRouteDecorator('PATCH');
