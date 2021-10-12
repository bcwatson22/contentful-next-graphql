import { Page } from '_organisms';
import { contentProps, contentSitemap, filterLocales } from '_utils';

const Slug = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticPaths = async ({ locales }: IPageContext) => {

  const { pageCollection } = await contentSitemap();
  const { items: pages } = pageCollection;
  const subpages = pages.map(({ childPagesCollection }: IParentParam) => childPagesCollection.items.map(({ slug }: IPageParam) => slug)).flat();
  const filteredPages = pages.filter(({ slug }: IPageParam) => (slug !== '/' && !subpages.includes(slug)));
  const filteredLocales = filterLocales(locales);

  return {
    paths: 
      filteredLocales
        .map(locale => filteredPages
          .map(({ slug }: IPageParam) => ({ 
            params: { 
              slug
            },
            locale
          }))
        )
        .flat()
    ,
    fallback: false
  };

};

export const getStaticProps = async (ctx: IPageContext) => contentProps(ctx);

export default Slug;
