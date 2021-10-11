import { Page } from '_organisms';
import { contentProps, contentSitemap } from '_utils';

const Slug = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticPaths = async () => {

  const data = await contentSitemap();

  return {
    paths: data.pageCollection.items
      .filter(({ slug }: IPageParam) => slug !== '/')
      .map(({ slug }: IPageParam) => ({ 
        params: { 
          slug
        } 
      })),
    fallback: true
  };

};

export const getStaticProps = async (ctx: IPageContext) => contentProps(ctx);

export default Slug;
