import { withUrqlClient } from 'next-urql';
import { Page } from '_molecules';
import { contentfulProps, contentfulUrl, contentfulPreview } from '_utils';

const query = `
  query ($slug: String, $preview: Boolean=false) {
    pageCollection(where: {slug: $slug}, limit: 1, preview: $preview) {
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
    navCollection: pageCollection(preview: $preview) {
      items {
        title
        slug
      }
    }
  }
`;

const Home = ({ preview }: IPage) => (
  <Page query={query}
    slug="/"
    preview={preview} />
);

export const getStaticProps = async ({ preview = false }) => contentfulProps(query, preview);

export default withUrqlClient(
  () => ({
    url: contentfulPreview
  }),
  { ssr: false }
)(Home);
