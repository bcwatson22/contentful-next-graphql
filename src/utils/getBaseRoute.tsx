import hasSubRoute from './hasSubRoute';

const getBaseRoute = (route: string): string => {

  let baseRoute = route;

  if (hasSubRoute(route)) baseRoute = `/${route.split('/')[1]}`;

  return baseRoute;

};

export default getBaseRoute;
