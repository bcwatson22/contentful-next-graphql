import type { AppProps /*, AppContext */ } from 'next/app';
import { createClient, Provider as QueryProvider } from 'urql';
import { EnvProvider } from './../src/context';
import './../src/assets/styles/global.scss';

const client = createClient({
  url: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CF_SPACE_ID}`,
  fetchOptions: {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_CF_CDA_TOKEN}`
    }
  }
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <EnvProvider>
    <QueryProvider value={client}>
      <Component {...pageProps} />
    </QueryProvider>
  </EnvProvider>
);

export default MyApp;
