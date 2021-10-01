import { withUrqlClient } from 'next-urql';
import { Page } from '_molecules';
import { contentfulSsr, contentfulUrl } from '_utils';

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

const Home = () => (
  <Page query={query}
    title="home" />
);

export const getStaticProps = async () => {

  const response = await contentfulSsr(query);

  return {
    props: {
      urqlState: response.extractData()
    },
    revalidate: 600
  };

};

export default withUrqlClient(
  () => ({
    url: contentfulUrl
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(Home);
