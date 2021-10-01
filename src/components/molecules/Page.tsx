import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import useSWR from 'swr';
import Favicon from './Favicon';
import Indicator from './Indicator';
import Layout from './Layout';
import Providers from './Providers';
import { Hero } from '_organisms';
import { LazyContext } from '_context';
import { delay, fetcher, isLoading, lazyload } from '_utils';
import { useComponent } from '_hooks';

interface IMeta {
  title: string;
  description: string;
  keywords: string;
}

interface IPageData {
  meta: IMeta;
  components: IComponent[];
}

interface IPageResponse {
  json: IPageData;
  status: number;
}

export interface IProps {
  endpoint: string;
  response: IPageResponse;
  host: string;
}

interface IMatched {
  component: IComponent;
}

const Component = ({ component }: IMatched) => {

  const { id, content } = component;
  const Component = useComponent(id);
  
  return Component 
    ? <Component content={content} />
    : null;

};

const Page = ({ response, endpoint, host }: IProps) => {

  const { data } = useSWR(endpoint, fetcher, { initialData: response });
  const { asPath } = useRouter();
  const { refresh } = useContext(LazyContext);

  const { meta, hero, components } = data?.json;
  const { title, description, keywords, canonical, robots, sharing } = meta;
  const { opengraph, twitter } = sharing;
  const { url: ogUrl, title: ogTitle, description: ogDescription, image: ogImage } = opengraph;
  const { title: twTitle, description: twDescription, image: twImage } = twitter;

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
          <title>{ title }</title>
          <meta name="description" 
            content={description} />
          <meta name="keywords" 
            content={keywords} />
          <meta name="robots" 
            content={robots} />
          <Favicon />
          <link rel="canonical" 
            href={canonical} />
          <link rel="alternate" 
            href="https://prosperex.com.au/" 
            hrefLang="x-default" />
          {ogUrl && (
            <meta property="og:url" 
              content={ogUrl} />
          )}
          {ogTitle && (
            <meta property="og:title" 
              content={ogTitle} />
          )}
          {ogDescription && (
            <meta property="og:description" 
              content={ogDescription} />
          )}
          {ogImage && (
            <meta property="og:image" 
              content={ogImage} />
          )}
          {twTitle && (
            <meta name="twitter:title" 
              content={twTitle} />
          )}
          {twDescription && (
            <meta name="twitter:description" 
              content={twDescription} />
          )}
          {twImage && (
            <meta name="twitter:image:src" 
              content={twImage} />
          )}
        </Head>
        <Providers>
          <Layout endpoint={endpoint}
            host={host}>
            {hero && <Hero />}
            {components?.map((component: IComponent, i: number) => {

              const { id } = component;

              return (
                <Component key={`${id}-${i}`} 
                  component={component} />
              );

            })}
          </Layout>
        </Providers>
      </>
    </Indicator>
  );

};

export default Page;
