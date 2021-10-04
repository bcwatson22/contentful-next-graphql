import { withUrqlClient } from 'next-urql';
import { Page } from '_molecules';
import { contentfulProps, contentfulUrl } from '_utils';

const query = `
  query ($slug: String) {
    pageCollection(where: {slug: $slug}, limit: 1) {
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
    navCollection: pageCollection {
      items {
        title
        slug
      }
    }
  }
`;

const Home = () => (
  <Page query={query}
    slug="/" />
);

export const getStaticProps = async () => contentfulProps(query);

export default withUrqlClient(
  () => ({
    url: contentfulUrl
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(Home);
