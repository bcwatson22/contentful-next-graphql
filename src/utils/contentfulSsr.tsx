import { createClient } from 'urql';

const endpointBase = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CF_SPACE_ID}?access_token=`;

const previewUrl = `${endpointBase}${process.env.NEXT_PUBLIC_CF_CPA_TOKEN}`;

const contentUrl = `${endpointBase}${process.env.NEXT_PUBLIC_CF_CDA_TOKEN}`;

export const clientContent = createClient({
  url: contentUrl
});

export const clientPreview = createClient({
  url: previewUrl
});

const contentQuery = `
  query ($slug: String, $locale: String="en", $preview: Boolean=false) {
    currentPage: pageCollection(where: {slug: $slug}, limit: 1, locale: $locale, preview: $preview) {
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
    headerNav: navigation(id: "4PCsX1jFNXIXv0sB68cJuN", locale: $locale, preview: $preview) {
      linksCollection {
        items {
          title
          slug 
          childPagesCollection {
            items {
              title
              slug
            }
          }
        }
      }
    }
  }
`;

const sitemapQuery = `
  {
    pageCollection {
      items {
        slug
        childPagesCollection {
          items {
            slug
          }
        }
      }
    }
  }
`;

export const contentServer = async ({ locale, params, preview }: IPageContext) => {

  const slug = params?.subslug ?? params?.slug ?? 'be reyt';

  const queryVars = {
    slug,
    locale,
    preview
  };

  const { data } = preview 
    ? await clientPreview.query(contentQuery, queryVars).toPromise()
    : await clientContent.query(contentQuery, queryVars).toPromise();

  return data;

};

export const contentSitemap = async () => {

  const { data } = await clientContent.query(sitemapQuery).toPromise();

  return data;

};

export const contentProps = async (ctx: IPageContext) => {

  const data = await contentServer(ctx);
  const { locale, params, preview = false } = ctx;
  const { slug, subslug } = params;

  if (locale === 'catchAll') {

    return {
      redirect: {
        destination: `/en/${slug}${subslug ? '/' + subslug : ''}`,
        locale: false,
        permanent: true
      }
    };

  }

  return {
    props: {
      data,
      preview: preview
    }
  };

};
