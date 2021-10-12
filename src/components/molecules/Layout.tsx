import Component from './Component';
import { Locales, Primary } from '_navigation';

const Layout = ({ data }: IPage) => {

  if (!data) return <h1>Nein</h1>;

  return (
    <div className="wrapper">
      <main role="main">
        <h1>{ data.currentPage.items[0].title }</h1>
        <Locales />
        <Primary links={data.headerNav.linksCollection.items} />
        {data.currentPage.items[0].componentsCollection.items.map((component: IComponent, i: number) => (
          <Component key={`${component?.__typename}-${i}`} 
            component={component} />
        ))}
      </main>
    </div>
  );

};

export default Layout;
