import 'reflect-metadata';

interface RouteMetadata {
  path: string;
  method: string;
  key: string;
}

export const Controller = (basePath: string = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('basePath', basePath, target);
  };
};

export const GET = (path: string): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const routes = [];
    routes.push({ path, method: 'get', key: key.toString() });

    Reflect.defineMetadata('routes', routes, target);
  };
};

export const POST = (path: string): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ path, method: 'post', key: key.toString() });
    Reflect.defineMetadata('routes', routes, target);
  };
};

export const DELETE = (path: string): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ path, method: 'delete', key: key.toString() });
    Reflect.defineMetadata('routes', routes, target);
  };
};

export const PATCH = (path: string): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ path, method: 'patch', key: key.toString() });
    Reflect.defineMetadata('routes', routes, target);
  };
};

export const PUT = (path: string): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ path, method: 'put', key: key.toString() });
    Reflect.defineMetadata('routes', routes, target);
  };
};
