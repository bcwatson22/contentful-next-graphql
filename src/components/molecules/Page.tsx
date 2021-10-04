import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useQuery } from 'urql';
import Indicator from './Indicator';
import Providers from './Providers';
import { Primary } from '_navigation';
import { LazyContext } from '_context';
import { delay, isLoading, lazyload } from '_utils';
import { useComponent } from '_hooks';

export interface IProps {
  query: string;
  slug: string;
}

interface IMatched {
  component: IComponent;
}

const Component = ({ component }: IMatched) => {

  const id = component.__typename.split('Organism')[1];
  const Component = useComponent(id);
  const content = { ...component };
  
  return Component 
    ? <Component content={content} />
    : null;

};

const Page = ({ query, slug }: IProps) => {

  const { asPath } = useRouter();
  const { refresh } = useContext(LazyContext);
  const [{ fetching, data, error }] = useQuery({
    query,
    variables: { slug }
  });

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

  if (fetching) return <h1>Fetching...</h1>;

  if (error) return <h1>Error with query: {error.message}</h1>;

  return (
    <Indicator>
      <>
        <Head>
          
        </Head>
        <Providers>
          <div className="wrapper">
            <main role="main">
              <h1>Nah then { data.pageCollection.items[0].title } ({ data.pageCollection.items[0].slug })</h1>
              <Primary links={data.navCollection.items} />
              {data.pageCollection.items[0].componentsCollection.items.map((component: IComponent, i: number) => (
                <Component key={`${component.__typename}-${i}`} 
                  component={component} />
              ))}
            </main>
          </div>
        </Providers>
      </>
    </Indicator>
  );

};

export default Page;
