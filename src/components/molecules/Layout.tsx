import Component from './Component';
import { Primary } from '_navigation';

const Layout = ({ data }: IPage) => {

  if (!data) return <h1>Nein</h1>;

  return (
    <div className="wrapper">
      <main role="main">
        <h1>Nah then { data.currentPage.items[0].title } ({ data.currentPage.items[0].slug })</h1>
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
