import { withUrqlClient } from 'next-urql';
import { Page } from '_molecules';
import { contentfulPaths, contentfulProps, contentfulUrl } from '_utils';

interface IPage {
  slug: string;
}

const pageQuery = `
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

const pathQuery = `
  {
    pageCollection {
      items {
        slug
      }
    }
  }
`;

const About = () => (
  <Page query={pageQuery}
    title="about" />
);

export const getStaticPaths = async () => {

  const response = await contentfulPaths(pathQuery);
  const extracted = response.extractData();
  const key = Object.keys(extracted)[0];
  const data = extracted[key].data;
  const pages = typeof data === 'string' ? JSON.parse(data).pageCollection.items : [{ slug: 'placeholder' }];

  console.log(pages);

  return {
    paths: pages.map((item: IPage) => ({ params: { route: item.slug } })),
    fallback: false
  };

};

export const getStaticProps = async () => contentfulProps(pageQuery);

export default withUrqlClient(
  () => ({
    url: contentfulUrl
  }),
  { ssr: false }
)(About);
