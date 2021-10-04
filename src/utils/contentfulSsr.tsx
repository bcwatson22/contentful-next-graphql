import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { initUrqlClient } from 'next-urql';

export const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CF_SPACE_ID}`;

export const server = async (query: string) => {

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient({
    url,
    fetchOptions: {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_CF_CDA_TOKEN}`
      }
    },
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
  }, false);

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(query).toPromise();

  return ssrCache;

};

export const extract = async (query: string) => {

  const response = await server(query);

  return {
    props: {
      urqlState: response.extractData()
    },
    revalidate: 600
  };

};
