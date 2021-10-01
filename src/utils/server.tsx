import fetcher from './fetcher';

const serverMarketing = async (resolvedUrl = '', res: { statusCode: number; } | undefined, staticPage = false) => {

  const endpoint = staticPage ? '' : `${process.env.API_URL}/pages${resolvedUrl}`;
  const response = staticPage ? { status: 200 } : await fetcher(endpoint);
  const global = await fetcher(`${process.env.API_URL}/global`);

  if (res && res.statusCode) res.statusCode = response.status;

  return { 
    props: {
      endpoint,
      response,
      global,
      host: process.env.HOST
    } 
  };

};

export default serverMarketing;
