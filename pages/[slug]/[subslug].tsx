import { Page } from '_organisms';
import { contentProps, contentSitemap, filterLocales } from '_utils';

const SubSlug = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticPaths = async ({ locales }: IPageContext) => {

  const { pageCollection } = await contentSitemap();
  const filteredPages = pageCollection.items.filter(({ childPagesCollection }: IParentParam) => childPagesCollection.items.length > 0);
  const filteredLocales = filterLocales(locales);

  return {
    paths: 
      filteredLocales
        .map(locale => filteredPages
          .map(({ slug, childPagesCollection }: IParentParam) => childPagesCollection.items
            .map(({ slug: subslug }: IPageParam) => ({
              params: {
                slug,
                subslug
              },
              locale
            }))
          )
        )
        .flat(2)
    ,
    fallback: false
  };

};

export const getStaticProps = async (ctx: IPageContext) => contentProps(ctx);

export default SubSlug;
