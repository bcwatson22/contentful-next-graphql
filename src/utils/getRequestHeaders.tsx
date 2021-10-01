const getRequestHeaders = (omitType = false, token = '55ad9958-b729-4834-9de5-86eedab28g6t'): Headers => {

  const headers = new Headers();

  headers.append('Access-Token', token);

  if (!omitType) headers.append('Content-Type', 'application/json');

  return headers;

};

export default getRequestHeaders;
