import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { Favicon, Indicator, Layout, Preview, Providers } from '_molecules';
import { LazyContext } from '_context';
import { delay, isLoading, lazyload } from '_utils';
import { isTypeSystemDefinitionNode } from 'graphql';

const filteredPages = {
  'pageCollection': {
    'items': [
      {
        'slug': '/',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'our-services',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'about',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'contact',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'birmingham-airport',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'sport',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'entertainment',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'industries',
        'childPagesCollection': {
          'items': [
            {
              'slug': 'sport'
            },
            {
              'slug': 'entertainment'
            },
            {
              'slug': 'media'
            }
          ]
        }
      },
      {
        'slug': 'media',
        'childPagesCollection': {
          'items': []
        }
      },
      {
        'slug': 'case-studies',
        'childPagesCollection': {
          'items': [
            {
              'slug': 'birmingham-airport'
            }
          ]
        }
      }
    ]
  }
};

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

  useEffect(() => {

    // map through and create array of all subpages, then filter out pageCollection.items if present in mapped array
    const subpages = filteredPages.pageCollection.items.map(({ childPagesCollection }: IParentParam) => childPagesCollection.items.map(({ slug }: IPageParam) => slug)).flat();

    const filts = filteredPages.pageCollection.items
      .filter(
        ({ slug }: IPageParam) => slug !== '/'
      )
      .filter(
        ({ slug }: IPageParam) => !subpages.includes(slug)
      );

    console.log(subpages);
    console.log(filts);

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
