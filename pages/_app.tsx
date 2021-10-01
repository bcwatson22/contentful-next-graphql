import type { AppProps /*, AppContext */ } from 'next/app';
import { EnvProvider } from './../src/context';
import './../src/assets/styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <EnvProvider>
    <Component {...pageProps} />
  </EnvProvider>
);

export default MyApp;
