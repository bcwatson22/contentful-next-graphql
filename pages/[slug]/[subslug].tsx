import { Page } from '_organisms';
import { contentProps, contentSitemap } from '_utils';

interface IChildPages {
  items: IPageParam[];
}

interface IParentParam extends IPageParam {
  childPagesCollection: IChildPages;
}

const SubSlug = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticPaths = async () => {

  const data = await contentSitemap();

  return {
    paths: data.pageCollection.items
      .filter(({ childPagesCollection }: IParentParam) => childPagesCollection.items.length > 0)
      .map(({ slug, childPagesCollection }: IParentParam) => childPagesCollection.items.map(({ slug: subslug }: IPageParam) => ({
        params: {
          slug,
          subslug
        }
      }))[0]),
    fallback: true
  };

};

export const getStaticProps = async (ctx: IPageContext) => contentProps(ctx);

export default SubSlug;
