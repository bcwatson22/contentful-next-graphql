const hasSubRoute = (route: string): boolean => (route.match(/\//g) || []).length > 1;

export default hasSubRoute;
