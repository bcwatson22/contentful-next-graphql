import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { Page } from '_molecules';
import { contentfulPaths, contentfulProps, contentfulUrl, getBaseRoute } from '_utils';

interface IParam {
  slug: string;
}

const pageQuery = `
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

const pathQuery = `
  {
    pageCollection {
      items {
        slug
      }
    }
  }
`;

const Route = ({ preview }: IPage) => {

  const { asPath } = useRouter();

  return (
    <Page query={pageQuery}
      slug={getBaseRoute(asPath)}
      preview={preview} />
  );

};

export const getStaticPaths = async ({ preview = false }) => {

  const response = await contentfulPaths(pathQuery, preview);
  const extracted = response.extractData();
  const key = Object.keys(extracted)[0];
  const data = extracted[key].data;
  const pages = typeof data === 'string' 
    ? JSON.parse(data).pageCollection.items : [{ slug: 'placeholder' }];

  return {
    paths: pages.map((item: IParam) => ({ params: { route: item.slug } })),
    fallback: true
  };

};

export const getStaticProps = async ({ preview = false }) => contentfulProps(pageQuery, preview);

export default withUrqlClient(
  () => ({
    url: contentfulUrl
  }),
  { ssr: false }
)(Route);
