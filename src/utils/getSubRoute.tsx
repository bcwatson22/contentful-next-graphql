import hasSubRoute from './hasSubRoute';

const getSubRoute = (route: string): string => {

  let subRoute = route;

  if (hasSubRoute(route)) subRoute = `/${route.split('/')[2]}`;

  return subRoute;

};

export default getSubRoute;
