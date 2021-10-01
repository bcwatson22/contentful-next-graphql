import { useQuery } from 'urql';
import { useComponent } from '_hooks';

interface IMatched {
  component: IComponent;
}

const query = `
  {
    pageCollection(where: { slug: "/" }, limit: 1) {
      items {
        title
        slug
        componentsCollection {
          items {
            __typename
            ... on OrganismBanner {
              heading
              body {
                json
              }
              button {
                text
                target {
                  slug
                }
              }
            }
            ... on OrganismServices {
              heading
              intro {
                json
              }
              servicesCollection(limit: 3) {
                items {
                  subheading
                  description {
                    json
                  }
                  image {
                    url
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Component = ({ component }: IMatched) => {

  const id = component.__typename.split('Organism')[1];
  const Component = useComponent(id);
  const content = { ...component };
  
  return Component 
    ? <Component content={content} />
    : null;

};

const Home = () => {

  const [{ fetching, data, error }] = useQuery({
    query
  });

  if (fetching) return <h1>Fetching...</h1>;

  if (error) return <h1>Error with query: {error.message}</h1>;

  return (
    <>
      <h1>Ey up</h1>
      {data.pageCollection.items[0].componentsCollection.items.map((component: IComponent, i: number) => (
        <Component key={`${component.__typename}-${i}`} 
          component={component} />
      ))}
    </>
  );

};

// export const getStaticProps = async () => {



// };

export default Home;
