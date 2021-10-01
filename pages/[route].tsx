import { withUrqlClient } from 'next-urql';
import { Page } from '_molecules';
import { contentfulSsr, contentfulUrl } from '_utils';

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

  const response = await contentfulSsr(pathQuery);
  const extracted = response.extractData();
  const key = Object.keys(extracted)[0];
  const data = extracted[key].data;
  const pages = typeof data === 'string' ? JSON.parse(data).pageCollection.items : [{ slug: 'placeholder' }];

  return {
    paths: pages.map((item: IPage) => ({ params: { route: item.slug } })),
    fallback: false
  };

};

export const getStaticProps = async () => {

  const response = await contentfulSsr(pageQuery);

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
  { ssr: false }
)(About);
