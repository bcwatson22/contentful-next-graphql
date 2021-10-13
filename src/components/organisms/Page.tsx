import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { Favicon, Indicator, Layout, Preview, Providers } from '_molecules';
import { LazyContext } from '_context';
import { delay, isLoading, lazyload } from '_utils';

const Page = ({ data, preview }: IPage) => {

  const { asPath } = useRouter();
  const { refresh } = useContext(LazyContext);

  useEffect(() => {

    delay(300).then(() => lazyload());

  }, [asPath, refresh]);

  useEffect(() => {

    isLoading(false);

    Router.events.on('routeChangeStart', () => isLoading(true));
    Router.events.on('routeChangeComplete', () => isLoading(false));

    return () => {

      Router.events.off('routeChangeStart', () => isLoading(false));
      Router.events.off('routeChangeComplete', () => isLoading(false));

    };

  }, []);

  return (
    <Indicator>
      <>
        <Head>
          <title>Contentful PoC</title>
          <Favicon />
        </Head>
        <Providers preview={preview}>
          <Preview preview={preview} />
          <Layout data={data}
            preview={preview} />
        </Providers>
      </>
    </Indicator>
  );

};

export default Page;
