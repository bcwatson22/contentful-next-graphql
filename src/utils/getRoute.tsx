const getRoute = (section: string): string => {

  let route = '';

  switch (true) {

    case section === 'Happiness':
      route = 'happiness';
      break;
      
    case (section === 'Survey' || section === 'Surveys'):
      route = 'surveys';
      break;

    case section === 'Learning':
      route = 'learning';      
      break;

    default:
      break;

  }

  return route;

};

export default getRoute;