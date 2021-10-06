const getBaseRoute = (route: string): string => {

  let baseRoute = route.split('/')[1];

  if (route === '/') baseRoute = '/';

  return baseRoute;

};

export default getBaseRoute;
