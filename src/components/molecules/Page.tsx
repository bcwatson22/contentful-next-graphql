import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Indicator from './Indicator';
import Layout from './Layout';
import Providers from './Providers';
import { LazyContext } from '_context';
import { delay, isLoading, lazyload } from '_utils';

const Page = ({ data, slug, preview }: IPage) => {

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
          
        </Head>
        <Providers preview={preview}>
          <Layout data={data}
            slug={slug}
            preview={preview} />
        </Providers>
      </>
    </Indicator>
  );

};

export default Page;
