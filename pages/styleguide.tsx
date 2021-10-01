import { useEffect } from 'react';
import Head from 'next/head';
import { Layout, Providers } from '_molecules';
import { Hero } from '_organisms';
import { Breakpoints, Colours, Fonts, Hierarchy } from '_components/styleguide';
import { delay, lazyload } from '_utils';

const Styleguide = () => {

  useEffect(() => {

    delay(300).then(() => lazyload());

  }, []);

  return (
    <>
      <Head>
        <title>Styleguide | Prosper Ex</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <Providers>
        <Layout>
          <Hero />
          <Colours />
          <Fonts />
          <Hierarchy />
          <Breakpoints />
        </Layout>
      </Providers>
    </>
  );

};

export default Styleguide;
