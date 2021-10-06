import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { initUrqlClient } from 'next-urql';

const base = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CF_SPACE_ID}?access_token=`;

export const previewUrl = `${base}${process.env.NEXT_PUBLIC_CF_CPA_TOKEN}`;

export const contentUrl = `${base}${process.env.NEXT_PUBLIC_CF_CDA_TOKEN}`;

export const server = async (query: string, preview: boolean) => {

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient({
    url: previewUrl,
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
  }, false);

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(query).toPromise();

  return ssrCache;

};

export const extract = async (query: string, preview: boolean) => {

  const response = await server(query, preview);

  return {
    props: {
      urqlState: response.extractData(),
      preview
    },
    revalidate: 600
  };

};
