import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Primary } from '_navigation';
import { useComponent } from '_hooks';

interface IProps extends IPage {
  children?: ReactNode;
}

interface IMatched {
  component: IComponent;
}

const Component = ({ component }: IMatched) => {

  const id = component?.__typename.split('Organism')[1];
  const Component = useComponent(id);
  const content = { ...component };

  return Component 
    ? <Component content={content} />
    : null;

};

const Layout = ({ data, slug, preview, children }: IProps) => {

  const { asPath, locale } = useRouter();

  if (!data) return <h1>Nein</h1>;

  return (
    <div className="wrapper">
      <main role="main">
        <h1>Nah then { data.pageCollection.items[0].title } ({ data.pageCollection.items[0].slug })</h1>
        {preview ? (
          <div style={{ margin: '2rem 0' }}>
            You're in preview mode!
            <Link href="/api/preview-exit">
              <a style={{ textDecoration: 'underline', marginLeft: 5 }}>Exit</a>
            </Link>
          </div>
        ) : (
          // <Link href={`/api/preview?slug=/${locale}${asPath}`}>
          <Link href={`/api/preview?slug=${asPath}`}>
            <a style={{ textDecoration: 'underline' }}>Enter preview</a>
          </Link>
        )}
        <Primary links={data.navCollection.items} />
        {data.pageCollection.items[0].componentsCollection.items.map((component: IComponent, i: number) => (
          <Component key={`${component?.__typename}-${i}`} 
            component={component} />
        ))}
        { children && children }
      </main>
    </div>
  );

};

export default Layout;
